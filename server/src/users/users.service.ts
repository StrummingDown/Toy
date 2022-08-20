import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }
  getOneUser(id: string): User {
    return this.users.find((user) => user.id === parseInt(id));
  }
  deleteOneUser(id: string): boolean {
    this.users.filter((user) => user.id !== parseInt(id));
    return true;
  }
  createUser(userData) {
    this.users.push({
      id: this.users.length + 1,
      ...userData,
    });
  }
}
