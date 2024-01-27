import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ParseIdPipe } from 'src/pipes/id.pipe';
import { SanitizeRegexPipe } from 'src/pipes/sanitize.pipe';
import {
  CreatePostDto,
  ID,
  PageInfo,
  SortInfo,
  UpdatePostDto,
} from './post.dto';
import { Post as BlogPost } from './post.schema';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private service: PostService) {}

  @Get()
  findAll(
    @Query() pageInfo: PageInfo,
    @Query('search', SanitizeRegexPipe) search: string,
    @Query() sort: SortInfo,
  ): Promise<BlogPost[]> {
    return this.service.findAll(pageInfo, search, sort);
  }

  @Post()
  async create(@Body() post: CreatePostDto): Promise<BlogPost> {
    return this.service.create(post);
  }

  @Get(':id')
  find(@Param('id', ParseIdPipe) id: ID): Promise<BlogPost> {
    return this.service.find(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIdPipe) id: ID,
    @Body() post: UpdatePostDto,
  ): Promise<BlogPost> {
    return this.service.update(id, post);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIdPipe) id: ID): Promise<void> {
    this.service.delete(id);
  }
}
