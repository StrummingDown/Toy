import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/Users.entity';
import { PrismaService } from 'prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  private Users: User[] = [];
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }
  async getOneUser(id: number): Promise<Users> {
    // try { try안에서 NotFoundException이 작동하지 않는다..
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID: ${id} not found.`);
    }
    return user;
    // } catch {}
  }
  async deleteOneUser(id: number): Promise<Users> {
    try {
      await this.getOneUser(id);
      return await this.prisma.users.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`User with ID: ${id} not found.`);
    }
  }
  createUser(userData: CreateUserDto): Promise<Users> {
    const { password, email, nickname, location } = userData;
    return this.prisma.users.create({
      data: {
        password,
        email,
        nickname,
        location,
      },
    });
  }
  async updateUser(id: number, updateDate: UpdateUserDto): Promise<Users> {
    try {
      const { password, email, nickname, location } = updateDate;
      return await this.prisma.users.update({
        where: { id },
        data: { password, email, nickname, location },
      });
    } catch {
      throw new NotFoundException(`User with ID: ${id} not found.`);
    }
  }
}
