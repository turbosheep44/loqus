import { Controller, Get } from '@nestjs/common';
import { Post } from './post.schema';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private service: PostService) {}

  @Get()
  findAll(): Promise<Post[]> {
    return this.service.findAll();
  }
}
