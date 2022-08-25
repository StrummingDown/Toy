import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/Users.entity';
import { PrismaService } from 'prisma/prisma.service';
import { Users } from '@prisma/client';

type userId = {
  id: number;
};
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }
  async getOneUser(userId: string): Promise<Users> {
    // try { try안에서 NotFoundException이 작동하지 않는다..
    const user = await this.prisma.users.findUnique({ where: { userId } });
    if (!user) {
      throw new NotFoundException(`User with ID: ${userId} not found.`);
    }
    return user;
    // } catch {}
  }
  async deleteUser(email: string): Promise<Users> {
    try {
      return await this.prisma.users.delete({ where: { email } });
    } catch {
      throw new NotFoundException(`User with ID: ${email} not found.`);
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

      return await this.prisma.users.update({
        where: { email },
        data: { password, email, nickname },
      });
    } catch {
      throw new NotFoundException(`User with ID: ${id} not found.`);
    }
  }
  async login(userId: string, password: string): Promise<Users> {
    try {
      console.log(userId);
      const userData = await this.prisma.users.findFirst({
        where: { userId },
      });
      if (userData.password === password && userData.userId === userId) {
        return userData;
      } else {
        return null;
      }
    } catch {}
  }
}
