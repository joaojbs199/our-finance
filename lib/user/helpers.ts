import { prisma } from '@/lib/prisma';
import { User } from '@/lib/user/interfaces';

export const getUsers = async () => {
  const data = await prisma.user.findMany();
  return data;
};

export const getUser = async (email: string) => {
  const data = await prisma.user.findMany({
    where: {
      email: email,
    },
  });
  return data;
};

export const createUser = async (user: User) => {
  await prisma.user.create({
    data: user,
  });
};
