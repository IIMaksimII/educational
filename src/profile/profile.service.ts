import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}

  async getProfileById(userId: number) {
    const userProfile = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          completedCourses: {
            include: {
              course: true,
            },
          },
          userAchievements: {
            include: {
              achievement: true,
            },
          },
          UserProgress: true,
        },
      });
     
      if (!userProfile) {
        throw new Error('Пользователь не найден');
      }
      return userProfile;
    }
}
