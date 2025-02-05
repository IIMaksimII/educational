import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const modules = await this.prisma.module.findMany({
      include: {
        chapters: {
          include: {
            lessons: true
          }
        }
      }
    })

    return modules
  }
}
