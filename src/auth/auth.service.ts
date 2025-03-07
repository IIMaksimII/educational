import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/regist.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiration: string;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtSecret = configService.getOrThrow<string>('JWT_SECRET');
    this.jwtExpiration = configService.getOrThrow<string>('JWT_EXPIRATION');
  }

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    // Хэшировать пароль
    const passwordHash = await bcrypt.hash(password, 10);

   // Создайте пользователя в базе данных
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
      select: {
        id: true,
        username: true,
        role: true,
      }
    });

    // Сгенерировать токен JWT
    const payload = { sub: user.id, username: user.username, role: user.role };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.jwtSecret,
      expiresIn: this.jwtExpiration,
    });

    
    // Вернуть токен
    return {
      access_token: token,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Найти пользователя по электронной почте
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        username: true,
        role: true,
        passwordHash: true, // Нужно получить passwordHash для проверки пароля
      },
    });
      
     if (!user) {
        throw new UnauthorizedException('Invalicredentialsd ');
      }
    // Сравните пароль с сохраненным хэшем
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    // Если пароль неверен, выдается сообщение об ошибке
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
   const payload = { sub: user.id, username: user.username, role: user.role };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.jwtSecret,
      expiresIn: this.jwtExpiration,
    });

    // Вернуть токен
    return {
      access_token: token,
    };
  }
};