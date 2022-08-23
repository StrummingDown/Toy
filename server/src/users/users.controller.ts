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
  email: string;
};
type userId = {
  id: number;
};
type userEmail = {
  email: string;
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
    const { email } = body;
    console.log('컨트롤러 이메일', email);
    return this.usersService.login(email);
  }
  @Post('/mypage')
  getOneUser(@Body() userEmail: userEmail): Promise<Users> {
    const { email } = userEmail;
    return this.usersService.getOneUser(email);
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }
  @Delete()
  deleteUser(@Body() userEmail: userEmail) {
    const { email } = userEmail;

    return this.usersService.deleteUser(email);
  }
  @Patch('/:id')
  UpdateUser(
    @Param('id') userId: number,
    @Body() updateUserData: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, updateUserData);
  }
}
