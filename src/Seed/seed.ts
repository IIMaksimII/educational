import { PrismaClient } from '@prisma/client';

import { seedUsers } from './data/users';
import { seedLessonTypes } from './data/lessonTypes';
import { seedCourses } from './data/courses';
import { seedModules } from './data/modules';
import { seedChapters } from './data/chapters';
import { seedLessons } from './data/lessons';
import { seedExercises } from './data/exercises';
import { seedExerciseAttempts } from './data/exerciseAttempts';
import { seedUserProgress } from './data/userProgress';
import { seedUserCourses } from './data/userCourses';
import { seedAchievements } from './data/achievements';
import { seedUserAchievements } from './data/userAchievements';


//npx prisma db push --force-reset
//npx prisma db push
//npm run seeder

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding users...');
  const users = await seedUsers();

  console.log('Seeding lesson types...');
  const lessonTypes = await seedLessonTypes();

  console.log('Seeding courses...');
  const courses = await seedCourses();

  console.log('Seeding modules...');
  const modules = await seedModules(courses);

  console.log('Seeding chapters...');
  const chapters = await seedChapters(modules);

  console.log('Seeding lessons...');
  const lessons = await seedLessons(chapters, lessonTypes);

  console.log('Seeding exercises...');
  const exercises = await seedExercises(lessons);

  console.log('Seeding exercise attempts...');
  await seedExerciseAttempts(users, exercises);

  console.log('Seeding user progress...');
  await seedUserProgress(users, lessons);

  console.log('Seeding user courses...');
  await seedUserCourses(users, courses);

  console.log('Seeding achievements...');
  const achievements = await seedAchievements();

  console.log('Seeding user achievements...');
  await seedUserAchievements(users, achievements);

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });