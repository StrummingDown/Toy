import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/Users.entity';
import { PrismaService } from 'prisma/prisma.service';
import { Users } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

type userId = {
  id: number;
};

type loginType = {
  userData: Users;
  token: string;
};
type token = {
  token: string;
};

type userData = {
  userId: string;
  password: string;
  nickname: string;
  email: string;
  location: string;
};
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }
  async getOneUser({ token }: token): Promise<Users> {
    // try { try안에서 NotFoundException이 작동하지 않는다..

    const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

    const user = await this.prisma.users.findUnique({
      where: { userId: userData['userId'] },
    });
    if (!user) {
      throw new NotFoundException(`User with ID: ${token} not found.`);
    }
    return user;
    // } catch {}
  }
  async deleteUser({ token }: token): Promise<Users> {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

      return await this.prisma.users.delete({
        where: { userId: userData['userId'] },
      });
    } catch {
      throw new NotFoundException(`User not found.`);
    }
  }
  createUser(userData: CreateUserDto): Promise<Users> {
    const { userId, password, email, nickname } = userData;
    // const id = parseInt(String(new Date().getTime()).substring(0, 4)); // 고유한 id 부여
    return this.prisma.users.create({
      data: {
        userId,
        password,
        email,
        nickname,
        location: '서울',
      },
    });
  }
  async updateUser(id: string, updateDate: UpdateUserDto): Promise<Users> {
    try {
      const { password, email, nickname } = updateDate;
      console.log(updateDate);
      return await this.prisma.users.update({
        where: { email },
        data: { password, email, nickname },
      });
    } catch {
      throw new NotFoundException(`User with ID: ${id} not found.`);
    }
  }
  async login(
    userId: string,
    password: string,
    token: string,
  ): Promise<loginType> {
    try {
      const userData = await this.prisma.users.findFirst({
        where: { userId },
      });

      if (userData.password === password && userData.userId === userId) {
        return { userData, token };
      } else {
        return null;
      }
    } catch {}
  }
}
