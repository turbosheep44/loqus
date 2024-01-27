import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get(':id')
  find(@Param('id') id: string): Promise<BlogPost> {
    return this.service.find(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() post: UpdatePostDto,
  ): Promise<BlogPost> {
    return this.service.update(id, post);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    this.service.delete(id);
  }
}
