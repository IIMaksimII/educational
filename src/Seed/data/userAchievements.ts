import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUserAchievements(
  users: { id: number }[],
  achievements: { id: number }[]
) {
  const userAchievementsData = [
    { userId: users[0].id, achievementId: achievements[0].id },
    
  ];

  for (const ua of userAchievementsData) {
    await prisma.userAchievement.create({
      data: {
        user: { connect: { id: ua.userId } },
        achievement: { connect: { id: ua.achievementId } },
      },
    });
  }
}
