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
type inputEmail = {
  email: string;
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
  @Post('certify')
  async certify(@Body() { phone }: { phone: string }): Promise<string> {
    return this.usersService.certify(phone);
  }
  @Post('login')
  login(@Body() body: body): Promise<object> | null {
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
  @Post('/findId')
  findUserId(@Body() email: inputEmail): Promise<Users> {
    return this.usersService.findUserId(email);
  }
  @Post('/checkId')
  checkUserId(@Body() userId: { userId: string }): Promise<boolean> {
    return this.usersService.checkUserId(userId);
  }
  @Post('/findPw')
  findUserPw(@Body() userId: { userId: string }): Promise<string> {
    return this.usersService.findUserPw(userId);
  }
  @Post('/changePw')
  changeUserPw(
    @Body()
    {
      userId,
      currentPw,
      changePw,
    }: {
      userId: string;
      currentPw: string;
      changePw: string;
    },
  ): Promise<boolean> {
    return this.usersService.changeUserPw({ userId, currentPw, changePw });
  }

  @Post()
  createUser(@Body() userData: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(userData);
  }
  @Delete()
  deleteUser(@Body() token: token): Promise<Users> {
    return this.usersService.deleteUser(token);
  }
  @Patch()
  UpdateUser(
    @Param() id: string,
    @Body() updateUserData: UpdateUserDto,
  ): Promise<Users> {
    return this.usersService.updateUser(id, updateUserData);
  }
}

// try {
//   const makeSign = () => {
//     const message = [];
//     const hmac = CryptoJS.createHmac(
//       'sha256',
//       'RvtrDPOZi4AnXKMxxUaAgvZADm5TAUd3XhNhL1wo',
//     );
//     const space = ' ';
//     const newLine = '\n';
//     const method = 'POST';
//     const timestamp = Date.now().toString();
//     message.push(method);
//     message.push(space);
//     message.push(
//       `/sms/v2/services/ncp:sms:kr:291860026013:sms_certify/messages`,
//     );
//     message.push(newLine);
//     message.push(timestamp);
//     message.push(newLine);
//     message.push('RvtrDPOZi4AnXKMxxUaAgvZADm5TAUd3XhNhL1wo');
//     //message 배열에 위의 내용들을 담아준 후에
//     const signature = hmac.update(message.join('')).digest('base64');
//     //message.join('') 으로 만들어진 string 을 hmac 에 담고, base64로 인코딩한다
//     return signature.toString(); // toString()이 없었어서 에러가 자꾸 났었는데, 반드시 고쳐야함.}
//   };
//   const body: any = {
//     type: 'SMS',
//     contentType: 'COMM',
//     countryCode: '82',
//     from: '01039022841',
//     content: '제발 좀 가라',
//     messages: [
//       {
//         to: '윤대규',
//         subject: '테스트',
//         content: '연습입니다.',
//       },
//     ],
//   };
//   const data = await axios.post(
//     `https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:291860026013:sms_certify/messages`,
//     {
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//         'x-ncp-apigw-timestamp': Date.now().toString(),
//         'x-ncp-iam-access-key': '3VS7DXEJO5nJmUbtJgdE',
//         'x-ncp-apigw-signature-v2': makeSign(),
//       },
//     },
//     body,
//   );
//   console.log('데이터', data);
// } catch (e) {
//   console.log(e);
// }
