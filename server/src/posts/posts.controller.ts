import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Posts } from '@prisma/client';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getAllPosts(): Promise<Posts[]> {
    return this.postsService.getAllPosts();
  }

  @Get('/:id')
  getOnePost(@Param() { id }: { id: string }): Promise<Posts> {
    return this.postsService.getOnePost(id);
  }

  @Post()
  createPost(
    @Body()
    {
      token,
      title,
      content,
    }: {
      token: string;
      title: string;
      content: string;
    },
  ): Promise<Posts> {
    return this.postsService.createPost(token, title, content);
  }

  @Patch('/:id')
  updatePost(
    @Param() { id }: { id: string },
    @Body() updatePostData: { title: string; content: string },
  ): Promise<Posts> {
    return this.postsService.updatePost(id, updatePostData);
  }

  @Delete('/:id')
  deletePost(@Param() { id }: { id: string }): Promise<boolean> {
    return this.postsService.deletePost(id);
  }
}
