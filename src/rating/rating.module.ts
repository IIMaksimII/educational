import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getjwtConfig } from 'src/Configs/jwt.config';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RatingController],
  providers: [RatingService, PrismaService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getjwtConfig,
    }),
  ],
})
export class RatingModule {}
