import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {
    return 'All Users';
  }

  @Get('/:id')
  getOneUser(@Param('id') userId: string) {
    return `One User and ID : ${userId}`;
  }

  @Post()
  createUser(@Body() userData) {
    console.log(userData);
    return 'Create User';
  }
  @Delete('/:id')
  deleteUser(@Param('id') userId: string) {
    return `Delete User ID ${userId}`;
  }
  @Patch('/:id')
  UpdateUser(@Param('id') userId: string, @Body() updateUserData) {
    return {
      updateUser: userId,
      ...updateUserData,
    };
  }
}
