import { PrismaClient, Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedUsers() {
  const users = [
    {
      username: 'testuser',
      email: 'testuser@mail.com',
      passwordHash: await bcrypt.hash('12345678', 0),
      role: Role.USER,
      registrationDate: new Date(),
      points: 100,
      streak: 5,
      lastActive: new Date(),
    },
    {
      username: 'adminuser',
      email: 'admin@mail.com',
      passwordHash: await bcrypt.hash('adminpass', 0),
      role: Role.ADMIN,
      registrationDate: new Date(),
      points: 500,
      streak: 10,
      lastActive: new Date(),
    },
  ];

  const createdUsers: User[] = [];

  for (const user of users) {
    const created = await prisma.user.create({ data: user });
    createdUsers.push(created);
  }
  return createdUsers;
}