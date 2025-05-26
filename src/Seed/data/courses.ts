import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCourses() {
  const courses = [
    {
      name: 'Основы JavaScript',
      description: 'Изучение основ JS',
      programmingLanguage: 'JavaScript',
    },
    {
      name: 'React с нуля',
      description: 'Погружение в React',
      programmingLanguage: 'JavaScript',
    },
  ];
  return Promise.all(courses.map(course => prisma.course.create({ data: course })));
}
