import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { Post as BlogPost } from './post.schema';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private service: PostService) {}

  @Get()
  findAll(): Promise<BlogPost[]> {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() post: CreatePostDto): Promise<BlogPost> {
    return this.service.create(post);
  }
}
