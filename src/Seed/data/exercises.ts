import { PrismaClient, Exercise, ExerciseType } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedExercises(lessons: { id: number }[]): Promise<Exercise[]> {
  const exercisesData = [
    {
      lessonId: lessons[0].id,
      type: ExerciseType.MULTIPLE_CHOICE,  
      questionText: 'Какая переменная является блочной?',
      correctAnswer: 'let',
      hint: 'Подумайте про область видимости.',
      order: 1,
      points: 10,
      answers: [
        { text: 'var', isCorrect: false },
        { text: 'let', isCorrect: true },
        { text: 'const', isCorrect: false },
      ],
    },
    {
      lessonId: lessons[1].id,
      
      type: ExerciseType.MULTIPLE_CHOICE,
      questionText: 'useState используется для управления состоянием.',
      correctAnswer: 'true',
      hint: 'Это базовый React hook.',
      order: 1,
      points: 15,
      answers: [
        { text: 'true', isCorrect: true },
        { text: 'false', isCorrect: false },
      ],
    },
  ];

  const createdExercises: Exercise[] = [];

  for (const exerciseData of exercisesData) {
    const { lessonId, answers, ...rest } = exerciseData;
    const exercise = await prisma.exercise.create({
      data: {
        ...rest,
        lesson: { connect: { id: lessonId } },
        answers: { create: answers },
      },
    });
    createdExercises.push(exercise);
  }

  return createdExercises;
}
