import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  async getOneUser(@Param('id') userId: number): Promise<Users> {
    return await this.usersService.getOneUser(userId);
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }
  @Delete('/:id')
  deleteUser(@Param('id') userId: number) {
    return this.usersService.deleteOneUser(userId);
  }
  @Patch('/:id')
  UpdateUser(
    @Param('id') userId: number,
    @Body() updateUserData: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, updateUserData);
  }
}
