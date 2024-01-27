import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ParseObjectId } from 'src/pipes/object-id.pipe';
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
  find(@Param('id', ParseObjectId) id: Types.ObjectId): Promise<BlogPost> {
    return this.service.find(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseObjectId) id: Types.ObjectId,
    @Body() post: UpdatePostDto,
  ): Promise<BlogPost> {
    return this.service.update(id, post);
  }

  @Delete(':id')
  async delete(@Param('id', ParseObjectId) id: Types.ObjectId): Promise<void> {
    this.service.delete(id);
  }
}
