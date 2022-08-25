import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import * as jwt from 'jsonwebtoken';

type body = {
  userId: string;
  password: string;
  nickname: string;
  email: string;
  location: string;
};
type userId = {
  id: number;
};
type userEmail = {
  userId: string;
};
type token = {
  token: string;
};
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  @Post('login')
  login(@Body() body: body) {
    const { userId, nickname, password, location } = body;
    const token = jwt.sign(
      { userId, nickname, password, location },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: '24h' },
    );

    return this.usersService.login(userId, password, token);
  }
  @Post('/mypage')
  getOneUser(@Body() token: token): Promise<Users> {
    return this.usersService.getOneUser(token);
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return this.usersService.createUser(userData);
  }
  @Delete()
  deleteUser(@Body() userId: userEmail) {
    return this.usersService.deleteUser(userId.userId);
  }
  @Patch()
  UpdateUser(@Param() id: string, @Body() updateUserData: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserData);
  }
}
