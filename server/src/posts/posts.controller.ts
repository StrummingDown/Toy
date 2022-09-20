import { Controller, Get, Post } from '@nestjs/common';
import { Posts } from '@prisma/client';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getAllPosts(): Promise<Posts[]> {
    return this.postsService.getAllPosts();
  }
  @Post()
  createPost(): Promise<Posts> {
    return this.postsService.createPost();
  }
}
