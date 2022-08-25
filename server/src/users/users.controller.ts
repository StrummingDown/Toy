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

type body = {
  userId: string;
  password: string;
};
type userId = {
  id: number;
};
type userEmail = {
  userId: string;
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
    const { userId, password } = body;

    return this.usersService.login(userId, password);
  }
  @Post('/mypage')
  getOneUser(@Body() userId: userEmail): Promise<Users> {
    return this.usersService.getOneUser(userId.userId);
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
