import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { PrismaService } from 'src/prisma.service';

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
