import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isValid } from '@/src/utils/validators';

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const isRegisteredUser = isValid(user);

  return NextResponse.json({ data: isRegisteredUser });
}
