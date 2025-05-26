import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUserCourses(users: { id: number }[], courses: { id: number }[]) {
  const userCoursesData = [
    {
      userId: users[0].id,
      courseId: courses[0].id,
      progress: 0,
      completed: true,
    }
  ];

  for (const uc of userCoursesData) {
    await prisma.userCourse.create({
      data: {
        user: { connect: { id: uc.userId } },
        course: { connect: { id: uc.courseId } },
        progress: uc.progress,
        completed: uc.completed,
      },
    });
  }
}
