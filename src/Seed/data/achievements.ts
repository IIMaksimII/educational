import { PrismaClient, Achievement } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAchievements(): Promise<Achievement[]> {
  const achievementsData = [
    {
      name: 'Первый шаг',
      description: 'Пройди первый урок',
      criteria: 'Завершить любой урок',
      pointsAwarded: 50,
    },
    {
      name: 'Марафон',
      description: 'Завершить 10 уроков подряд',
      criteria: 'Завершить 10 уроков подряд без пропусков',
      pointsAwarded: 200,
    },
  ];

  const createdAchievements: Achievement [] = [];
  for (const achievementData of achievementsData) {
    const achievement = await prisma.achievement.create({ data: achievementData });
    createdAchievements.push(achievement);
  }
  return createdAchievements;
}
