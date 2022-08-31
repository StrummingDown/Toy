import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Users } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import axios from 'axios';

type userId = {
  id: number;
};

type loginType = {
  userData: Users;
  token: string;
};
type token = {
  token: string;
};

type userData = {
  userId: string;
  password: string;
  nickname: string;
  email: string;
  location: string;
};
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private makeSignature(): string {
    const message = [];
    const hmac = crypto.createHmac(
      'sha256',
      'RvtrDPOZi4AnXKMxxUaAgvZADm5TAUd3XhNhL1wo',
    );
    const space = ' ';
    const newLine = '\n';
    const method = 'POST';
    const timestamp = Date.now().toString();
    message.push(method);
    message.push(space);
    message.push(
      'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:291860026013:sms_certify/messages',
    );
    message.push(newLine);
    message.push(timestamp);
    message.push(newLine);
    message.push('3VS7DXEJO5nJmUbtJgdE');
    //message 배열에 위의 내용들을 담아준 후에
    const signature = hmac.update(message.join('')).digest('base64');
    //message.join('') 으로 만들어진 string 을 hmac 에 담고, base64로 인코딩한다
    return signature.toString(); // toString()이 없었어서 에러가 자꾸 났었는데, 반드시 고쳐야함.
  }
  async getAllUsers(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }
  async getOneUser({ token }: token): Promise<Users> {
    try {
      //try안에서 NotFoundException이 작동하지 않는다..
      console.log('마이페이지', token);

      const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
      console.log('userData', userData);
      const user = await this.prisma.users.findUnique({
        where: { userId: userData['userId'] },
      });
      if (!user) {
        throw new NotFoundException(`User with ID: ${token} not found.`);
      }
      return user;
    } catch {}
  }
  async deleteUser({ token }: token): Promise<Users> {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

      return await this.prisma.users.delete({
        where: { userId: userData['userId'] },
      });
    } catch {
      throw new NotFoundException(`User not found.`);
    }
  }
  async createUser(userData: CreateUserDto): Promise<Users> {
    const { userId, password, email, nickname } = userData;
    const hashPw = await bcrypt.hash(password, 3);
    // const id = parseInt(String(new Date().getTime()).substring(0, 4)); // 고유한 id 부여
    return this.prisma.users.create({
      data: {
        userId,
        password: hashPw,
        email,
        nickname,
        location: '서울',
      },
    });
  }
  async updateUser(id: string, updateDate: UpdateUserDto): Promise<Users> {
    try {
      console.log('업데이트 요청');
      const { password, email, nickname, userId } = updateDate;
      console.log(email, nickname, userId);
      return await this.prisma.users.update({
        where: { userId: '꾸꾸까까' },
        data: { nickname },
      });
    } catch {
      throw new NotFoundException(`User with ID: ${id} not found.`);
    }
  }
  async login(
    userId: string,
    password: string,
    token: string,
  ): Promise<loginType> {
    try {
      const userData = await this.prisma.users.findFirst({
        where: { userId },
      });

      const correct = await bcrypt.compare(password, userData.password);

      if (correct && userData.userId === userId) {
        return { userData, token };
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  }
  async certify(phoneNumber: string) {
    const body = {
      type: 'SMS',
      contentType: 'COMM',
      countryCode: '82',
      from: '01039022841', // 발신자 번호
      content: `테스트다 !!!`,
      messages: [
        {
          to: '01039022841', // 수신자 번호
        },
      ],
    };
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': '3VS7DXEJO5nJmUbtJgdE',
        'x-ncp-apigw-timestamp': Date.now().toString(),
        'x-ncp-apigw-signature-v2': this.makeSignature(),
      },
    };
    const data = axios
      .post(
        'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:291860026013:sms_certify/messages',
        body,
        options,
      )
      .then(async (res) => {
        // 성공 이벤트
        console.log('성공', res);
      })
      .catch((err) => {
        console.error(err.response.data);
        throw new InternalServerErrorException();
      });

    return data;
  }
}
