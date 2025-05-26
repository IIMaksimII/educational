import { PrismaClient, Lesson } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessons(
  chapters: { id: number }[],
  lessonTypes: { id: number; name: string }[] 
): Promise<Lesson[]> {
  const lessonsData = [
    {
      nameLesson: 'Переменные',
      order: 1,
      description: 'var, let и const',
      videoUrl: '',
      textContent: 'В этом уроке вы узнаете про переменные в JavaScript.',
      chapterId: chapters[0].id,
      typeId: lessonTypes.find((lt) => lt.name === 'Теория')?.id,
    },
    {
      nameLesson: 'useState Hook',
      order: 1,
      description: 'Хук состояния в React',
      videoUrl: '',
      textContent: 'Урок по useState в React.',
      chapterId: chapters[1].id,
      typeId: lessonTypes.find((lt) => lt.name === 'Практика')?.id,
    },
  ];

  const createdLessons: Lesson[] = [];
  for (const lessonData of lessonsData) {
    const { chapterId, typeId, ...rest } = lessonData;
    if (!typeId) throw new Error('LessonType not found');
    const lesson = await prisma.lesson.create({
      data: {
        ...rest,
        chapter: { connect: { id: chapterId } },
        type: { connect: { id: typeId } },
      },
    });
    createdLessons.push(lesson);
  }
  return createdLessons;
}
