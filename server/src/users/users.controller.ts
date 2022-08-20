import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  getOneUser(@Param('id') userId: string): User {
    return this.usersService.getOneUser(userId);
  }

  @Post()
  createUser(@Body() userData) {
    return this.usersService.createUser(userData);
  }
  @Delete('/:id')
  deleteUser(@Param('id') userId: string) {
    return this.usersService.deleteOneUser(userId);
  }
  @Patch('/:id')
  UpdateUser(@Param('id') userId: string, @Body() updateUserData) {
    return {
      updateUser: userId,
      ...updateUserData,
    };
  }
}
