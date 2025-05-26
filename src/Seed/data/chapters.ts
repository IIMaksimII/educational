import { PrismaClient, Chapter } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedChapters(modules: { id: number }[]): Promise<Chapter[]> {
  const chaptersData = [
    {
      nameChapter: 'Переменные и типы',
      order: 1,
      description: 'Научимся работать с переменными и типами данных',
      moduleId: modules[0].id,
    },
    {
      nameChapter: 'useState и useEffect',
      order: 1,
      description: 'Изучение основных React hooks',
      moduleId: modules[1].id,
    },
  ];

  const createdChapters: Chapter [] = [];
  for (const chapterData of chaptersData) {
    const { moduleId, ...rest } = chapterData;
    const chapter = await prisma.chapter.create({
      data: {
        ...rest,
        module: { connect: { id: moduleId } },
      },
    });
    createdChapters.push(chapter);
  }
  return createdChapters;
}
