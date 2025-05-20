

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrainingService {
  constructor(private prisma: PrismaService) { }

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

  async getExercisesForLesson(lessonId: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        exercises: {
          include: {
            answers: true
          }
        },
      },
    });

    if (!lesson) {
      throw new Error('Урок не найден');
    }

    return lesson.exercises;
  }
}
