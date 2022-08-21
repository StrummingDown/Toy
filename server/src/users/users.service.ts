import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
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
  createUser(userData: CreateUserDto) {
    this.users.push({
      id: this.users.length + 1,
      ...userData,
    });
  }
  updateUser(id: number, updateDate: UpdateUserDto) {
    const user = this.getOneUser(id);
    this.deleteOneUser(id);
    this.users.push({ ...user, ...updateDate });
  }
}
