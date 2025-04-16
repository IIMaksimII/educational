import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrainingService {
  constructor(private prisma: PrismaService) {}

  async getAllTrainingModules() {
    //choose_word inset_word
    // const module = await this.prisma.module.update({
    //   where: { id: 2 },
    //   data: {
    //     chapters: {
    //       create: {
    //         nameChapter: 'хз',
    //         description: 'aslo xz',
    //         lessonsCircle: {
    //           create: {
    //             lessons: {
    //               create: {
    //                 nameLesson: '',
    //                 description: '',
    //                 typeId: 1,
    //                 textContent: 'class component',
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    // const module = await this.prisma.module.create({
    //   data: {
    //     nameModule: "Продвинутый уровеь",
    //     description: 'Поговорим о структурах'
    //   }
    // })

    return this.prisma.module.findMany({
      include: {
        chapters: {
          include: {
            lessonsCircle: {
              include: {
                lessons: {
                  include: {
                    exercises: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
