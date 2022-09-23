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
type inputEmail = {
  email: string;
};
const date = Date.now().toString();

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private makeSignature(): string {
    const message = [];
    const hmac = crypto.createHmac('sha256', process.env.SMS_SECRET_KEY);
    const space = ' ';
    const newLine = '\n';
    const method = 'POST';
    const timestamp = date;
    message.push(method);
    message.push(space);
    message.push(`/sms/v2/services/${process.env.SMS_SERVICE_ID}/messages`);
    message.push(newLine);
    message.push(timestamp);
    message.push(newLine);
    message.push(process.env.SMS_ACCESS_KEY);
    //message 배열에 위의 내용들을 담아준 후에
    const signature = hmac.update(message.join('')).digest('base64');
    //message.join('') 으로 만들어진 string 을 hmac 에 담고, base64로 인코딩한다
    return signature.toString(); // toString()이 없었어서 에러가 자꾸 났었는데, 반드시 고쳐야함.
  }

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async checkDuplicateId(userId: string): Promise<boolean> {
    const checkUserId = await this.prisma.users.findUnique({
      where: { userId },
    });
    if (checkUserId === null) {
      return true;
    }
    return false;
  }

  async checkDuplicateEmail(userEmail: string): Promise<boolean> {
    const checkUserEmail = await this.prisma.users.findUnique({
      where: { email: userEmail },
    });
    if (checkUserEmail === null) {
      return true;
    }
    return false;
  }
  async getOneUser({ token }: token): Promise<Users> {
    try {
      //try안에서 NotFoundException이 작동하지 않는다..

      const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
      // console.log('userData', userData);
      const user = await this.prisma.users.findUnique({
        where: { userId: userData['userId'] },
      });
      if (!user) {
        throw new NotFoundException(`User with ID: ${token} not found.`);
      }
      return user;
    } catch {}
  }
  async findUserId({ email }: inputEmail): Promise<Users> {
    try {
      return await this.prisma.users.findUnique({ where: { email } });
    } catch (err) {
      console.log(err);
    }
  }
  async checkUserId({ userId }: { userId: string }): Promise<boolean> {
    try {
      const user = await this.prisma.users.findUnique({ where: { userId } });
      if (user) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  }
  async findUserPw({ userId }: { userId: string }): Promise<string> {
    try {
      const changePw = Math.random().toString(36).slice(2);
      await this.prisma.users.update({
        where: { userId },
        data: {
          password: changePw,
        },
      });

      return changePw;
    } catch {
      throw new NotFoundException(`User not found.`);
    }
  }
  async changeUserPw({
    userId,
    currentPw,
    changePw,
  }: {
    userId: string;
    currentPw: string;
    changePw: string;
  }): Promise<boolean> {
    try {
      const { password } = await this.prisma.users.findFirst({
        where: { userId },
      });

      const correct = await bcrypt.compare(currentPw, password);

      if (correct) {
        const hashPw = await bcrypt.hash(changePw, 3);
        await this.prisma.users.update({
          where: { userId },
          data: {
            password: hashPw,
          },
        });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
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

  async updateUser(id: string, updateData: UpdateUserDto): Promise<Users> {
    try {
      const { email, nickname, userId } = updateData;
      return await this.prisma.users.update({
        where: { userId },
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
  async certify(phone: string) {
    try {
      const code = String(Math.floor(100000 + Math.random() * 9000));

      const body = {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: '82',
        from: '01039022841', // 발신자 번호
        content: `인증 번호는 ${code} 입니다.`,
        messages: [
          {
            to: phone, // 수신자 번호
          },
        ],
      };
      const options = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-ncp-iam-access-key': '3VS7DXEJO5nJmUbtJgdE',
          'x-ncp-apigw-timestamp': date,
          'x-ncp-apigw-signature-v2': this.makeSignature(),
        },
      };
      axios
        .post(
          `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.SMS_SERVICE_ID}/messages`,
          body,
          options,
        )
        .then(async (res) => {
          // 성공 이벤트
          console.log('성공', res);
        })
        .catch((err) => {
          console.error(err.response);
          // throw new InternalServerErrorException();
        });
      return code;
    } catch (err) {
      console.log(err);
    }
  }
}
