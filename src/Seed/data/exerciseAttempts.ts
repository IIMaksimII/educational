import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedExerciseAttempts(
  users: { id: number }[],
  exercises: { id: number }[]
) {


  const attemptsData = [
    {
      userId: users[0].id,
      exerciseId: exercises[0].id,
      userAnswer: 'let',
      correct: true,
    },
 
  ];

  for (const attempt of attemptsData) {
    if (!attempt.userId || !attempt.exerciseId) {
      console.warn( attempt);
      continue;
    }
    await prisma.exerciseAttempt.create({
      data: {
        user: { connect: { id: attempt.userId } },
        exercise: { connect: { id: attempt.exerciseId } },
        userAnswer: attempt.userAnswer,
        correct: attempt.correct,
      },
    });
  }
}
