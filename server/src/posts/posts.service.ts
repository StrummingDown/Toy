import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts() {
    return this.prisma.posts.findMany();
  }
  async createPost() {
    return this.prisma.posts.create({
      data: { title: '내 폰..', content: '어디갔냐고', userId: '휘인' },
    });
  }
}
