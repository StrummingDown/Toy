import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { PrismaService } from 'src/prisma.service';
import { users, Prisma } from '@prisma/client';
@Injectable()
export class UsersService {
  private users: User[] = [];
  constructor(private prisma: PrismaService) {}

  getAllUsers(): Promise<users[]> {
    return this.prisma.users.findMany();
  }
  getOneUser(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID: ${id} not found.`);
    }
    return user;
  }
  deleteOneUser(id: number): boolean {
    this.getOneUser(id);
    this.users = this.users.filter((user) => user.id !== id);
    return true;
  }
  createUser(userData: CreateUserDto): Promise<users> {
    return this.prisma.users.create({
      data: {
        id: 2,
        nickname: '자이라',
        location: '서초',
        email: '네이트',
        passowrd: '야채',
      },
    });
  }
  updateUser(id: number, updateDate: UpdateUserDto) {
    const user = this.getOneUser(id);
    this.deleteOneUser(id);
    this.users.push({ ...user, ...updateDate });
  }
}
