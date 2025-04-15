import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TrainingService {
  constructor(private prisma: PrismaService) {}

  async getAllTrainingModules() {
    return this.prisma.module.findMany({
      include: {
        chapters: {
          include: {
            lessons: {
              include: {
                exercises: true,
              },
            },
          },
        },
      },
    });
  }
}
