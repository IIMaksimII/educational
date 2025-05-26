import { PrismaClient, Module } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedModules(courses: { id: number }[]): Promise<Module[]> {
  const modulesData = [
    {
      nameModule: 'Введение в JS',
      description: 'Основные понятия JavaScript',
      order: 1,
      courseId: courses[0].id,
    },
    {
      nameModule: 'Hooks и контекст',
      description: 'Работа с React hooks и контекстом',
      order: 1,
      courseId: courses[1].id,
    },
  ];

  const createdModules: Module[] = [];

  for (const moduleData of modulesData) {
    const { courseId, ...rest } = moduleData;
    const module = await prisma.module.create({
      data: {
        ...rest,
        Course: { connect: { id: courseId } },
      },
    });
    createdModules.push(module);
  }

  return createdModules;
}
