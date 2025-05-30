import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PublishProgressDto } from './rating.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async getMyProgress(user_id: number) {
    const rating = await this.prisma.userProgress.findMany({
      where: { userId: user_id }
    })

    if(!rating) throw new NotFoundException('У вас нет прогресса :(')

    return {
      user_id,
      rating
    }
  }

  async getAllProgress() {
    const all_progress = await this.prisma.userProgress.findMany()

    if(!all_progress) throw new NotFoundException('Ни у кого нет прогресса 0_0') 

    return all_progress
  }

  async putUserProgress(user_id: number, dto: PublishProgressDto) {
    const user_progress = await this.prisma.userProgress.create({
      data: {
        completed: dto.completed,
        completionDate: new Date(),
        lastAccessed: new Date(),
        lessonId: dto.lessonId,
        userId: +user_id,
        score: dto.score
      }
    })

    if(!user_progress) throw new BadRequestException('Неудалось добавить прогресс')

    return user_progress
  }
}
