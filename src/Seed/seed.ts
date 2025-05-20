import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();



async function seed() {
    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        username: 'testuser',
        email: 'test@mail.com',
        passwordHash: await bcrypt.hash('12345678', 10),
      },
    });
  
    // Создание типа урока
    const lessonType = await prisma.lessonType.create({
      data: {
        name: 'Теория',
      },
    });
  
    // Создание курса
    const course = await prisma.course.create({
      data: {
        name: 'Основы JavaScript',
        description: 'Изучение базовых понятий JavaScript',
        programmingLanguage: 'JavaScript',
      },
    });
  
    // Создание модуля и привязка к курсу
    const module = await prisma.module.create({
      data: {
        nameModule: 'Введение в JS',
        description: 'Основные понятия JavaScript',
        order: 1,
        Course: {
          connect: {
            id: course.id,
          },
        },
      },
    });
  
    // Создание главы
    const chapter = await prisma.chapter.create({
      data: {
        nameChapter: 'Переменные и типы',
        order: 1,
        description: 'Научимся работать с переменными и типами данных',
        module: {
          connect: { id: module.id },
        },
      },
    });
  
    // Создание урока
    const lesson = await prisma.lesson.create({
      data: {
        nameLesson: 'Переменные',
        order: 1,
        description: 'var, let и const',
        videoUrl: '',
        textContent: 'В этом уроке вы узнаете про переменные в JavaScript.',
        chapter: { connect: { id: chapter.id } },
        type: { connect: { id: lessonType.id } },
      },
    });
  
    // Создание упражнения
    const exercise = await prisma.exercise.create({
      data: {
        lesson: { connect: { id: lesson.id } },
        type: 'MULTIPLE_CHOICE',
        questionText: 'Какая переменная является блочной?',
        correctAnswer: 'let',
        hint: 'Подумайте про область видимости.',
        order: 1,
        points: 10,
        answers: {
          create: [
            { text: 'var', isCorrect: false },
            { text: 'let', isCorrect: true },
            { text: 'const', isCorrect: false },
          ],
        },
      },
    });

    
  
    // Создание попытки пользователя
    await prisma.exerciseAttempt.create({
      data: {
        user: { connect: { id: user.id } },
        exercise: { connect: { id: exercise.id } },
        userAnswer: 'let',
        correct: true,
      },
    });
  
    // Прогресс по уроку
    await prisma.userProgress.create({
      data: {
        user: { connect: { id: user.id } },
        lesson: { connect: { id: lesson.id } },
        completed: true,
        score: 10,
        completionDate: new Date(),
      },
    });
  
    // Запись пользователя на курс
    await prisma.userCourse.create({
      data: {
        user: { connect: { id: user.id } },
        course: { connect: { id: course.id } },
        progress: 100,
        completed: true,
      },
    });
  
    // Достижение
    const achievement = await prisma.achievement.create({
      data: {
        name: 'Первый шаг',
        description: 'Пройди первый урок',
        criteria: 'Завершить любой урок',
        pointsAwarded: 50,
      },
    });
  
    // Назначение достижения пользователю
    await prisma.userAchievement.create({
      data: {
        user: { connect: { id: user.id } },
        achievement: { connect: { id: achievement.id } },
      },
    });
  
    console.log('База данных успешно заполнена!');
  }
  
  seed()
    .catch((e) => {
      console.error('Ошибка при заполнении:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });