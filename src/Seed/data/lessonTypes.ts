import { PrismaClient, LessonType } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedLessonTypes(): Promise<LessonType[]> {
  const lessonTypesData = [
    { name: 'Теория' },
    { name: 'Практика' },
    { name: 'Видеоурок' },
  ];

  const createdTypes: LessonType[] = []; 

  for (const typeData of lessonTypesData) {
    const lessonType = await prisma.lessonType.create({ data: typeData });
    createdTypes.push(lessonType);
  }

  return createdTypes;
}
