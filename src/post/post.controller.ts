import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './post.dto';
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() post: UpdatePostDto,
  ): Promise<BlogPost> {
    return this.service.update(id, post);
  }
}
