import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserQuery, User_Model } from './interfaces/user.interface';
import { prisma } from 'prisma/connection';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly users: User_Model[] = [];

  async create(user: User_Model) {
    const { password, ...resto } = user;

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    return await prisma.user.create({
      //data: user,
      data: {
        ...resto,
        password: hashedPassword,
      },
    });
  }

  async findAll(): Promise<UserQuery[]> {
    return await prisma.user.findMany({
      where: { state: true },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        google: false,
        state: false,
      },
    });
  }

  async findOne(id: number): Promise<UserQuery> {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: { message: 'Usuario no encontrado - findOne' },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
  }

  async editUser(id: number, user: Partial<User_Model>) {
    const previousUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!previousUser) {
      return new Error('Usuario no encontrado - edit user');
    }

    if (user.password) {
      const salt = await bcrypt.genSaltSync();
      const hashedPassword = await bcrypt.hashSync(user.password, salt);
      user.password = hashedPassword;
    }

    const patchedUser = {
      ...previousUser,
      ...user,
    };

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: patchedUser,
    });

    return updatedUser;
  }
  /*
  async editUser(id: number, user: User_Model) {
    return await prisma.user.update({
      where: { id: Number(id) },
      data: user,
    });
  }
*/

  async delete(userId: number) {
    return await prisma.user.delete({
      where: { id: userId },
    });
  }

  async findOneAuth(email: string): Promise<UserQuery | undefined> {
    return prisma.user.findUnique({
      where: { email: email },
    });
  }
}
