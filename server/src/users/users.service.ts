import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Users } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

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
    console.log('마이페이지');
    const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    console.log('userData', userData);
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
  async createUser(userData: CreateUserDto): Promise<Users> {
    const { userId, password, email, nickname } = userData;
    const hashPw = await bcrypt.hash(password, 3);
    // const id = parseInt(String(new Date().getTime()).substring(0, 4)); // 고유한 id 부여
    return this.prisma.users.create({
      data: {
        userId,
        password: hashPw,
        email,
        nickname,
        location: '서울',
      },
    });
  }
  async updateUser(id: string, updateDate: UpdateUserDto): Promise<Users> {
    try {
      console.log('업데이트 요청');
      const { password, email, nickname, userId } = updateDate;
      console.log(email, nickname, userId);
      return await this.prisma.users.update({
        where: { userId: '꾸꾸까까' },
        data: { nickname },
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
