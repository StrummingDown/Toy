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
  private Users: User[] = [];
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }
  async getOneUser(email: string): Promise<Users> {
    // try { try안에서 NotFoundException이 작동하지 않는다..
    console.log(email);
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with ID: ${email} not found.`);
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
    const { password, email, nickname } = userData;
    // const id = parseInt(String(new Date().getTime()).substring(0, 4)); // 고유한 id 부여
    return this.prisma.users.create({
      data: {
        password,
        email,
        nickname,
        location: '서울',
      },
    });
  }
  async updateUser(id: number, updateDate: UpdateUserDto): Promise<Users> {
    try {
      const { password, email, nickname } = updateDate;
      return await this.prisma.users.update({
        where: { id },
        data: { password, email, nickname },
      });
    } catch {
      throw new NotFoundException(`User with ID: ${id} not found.`);
    }
  }
  async login(email: string): Promise<Users> {
    try {
      console.log(
        await this.prisma.users.findFirst({ where: { email: email } }),
      );
      return await this.prisma.users.findFirst({ where: { email: email } });
    } catch {}
  }
}
