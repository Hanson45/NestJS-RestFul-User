import { prisma } from 'prisma/connection';

export async function isEmailExist(email: string): Promise<boolean> {
  const exist = await prisma.user.findUnique({ where: { email } });

  return !!exist;
}
