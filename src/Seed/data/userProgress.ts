import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUserProgress(users: { id: number }[], lessons: { id: number }[]) {
  const progressData = [
    {
      userId: users[0].id,
      lessonId: lessons[0].id,
      completed: true,
      score: 10,
      completionDate: new Date(),
    },
 
  ];

  for (const progress of progressData) {
    await prisma.userProgress.create({
      data: {
        user: { connect: { id: progress.userId } },
        lesson: { connect: { id: progress.lessonId } },
        completed: progress.completed,
        score: progress.score,
        completionDate: progress.completionDate,
      },
    });
  }
}
