import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts() {
    try {
      return this.prisma.posts.findMany();
    } catch (err) {
      console.log(err);
    }
  }

  async getOnePost(id: string) {
    try {
      const post = await this.prisma.posts.findUnique({
        where: { id: parseInt(id) },
      });

      if (post === null) {
        throw new NotFoundException(`Post with ID: ${id} not found.`);
      }

      return post;
    } catch {
      throw new NotFoundException(`Post with ID: ${id} not found.`);
    }
  }

  async createPost(token: string, title: string, content: string) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

      const user = await this.prisma.users.findUnique({
        where: { userId: userData['userId'] },
      });

      return this.prisma.posts.create({
        data: { title, content, userId: user['userId'] },
      });
    } catch {
      throw new NotFoundException(`Cannot Post.`);
    }
  }
  async updatePost(
    id: string,
    updatePostData: { title: string; content: string },
  ): Promise<Posts> {
    try {
      console.log('업데이트진입', updatePostData);
      const { title, content } = updatePostData;
      return this.prisma.posts.update({
        where: { id: parseInt(id) },
        data: {
          title,
          content,
        },
      });
    } catch {
      throw new NotFoundException(`Post with ID: ${id} not found.`);
    }
  }

  async deletePost(id: string) {
    try {
      await this.prisma.posts.delete({ where: { id: parseInt(id) } });
      return true;
    } catch {
      throw new NotFoundException(`Post with ID: ${id} not found.`);
    }
  }
}
