import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Posts } from '@prisma/client';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // @Get()
  // getAllPosts(): Promise<Posts[]> {
  //   return this.postsService.getAllPosts();
  // }
  // @Post()
  // createPost(): Promise<Posts> {
  //   return this.postsService.createPost();
  // }
  // @Patch()
  // updatePost(): Promise<Posts> {
  //   return this.postsService.updatePost();
  // }
  // @Delete()
  // deletePost():Promise<boolean>{
  //   return this.postsService.deletePost()
  // }
}
