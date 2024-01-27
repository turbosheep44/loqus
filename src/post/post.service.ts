import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './post.dto';
import { Post } from './post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private posts: Model<Post>) {}

  async findAll(): Promise<Post[]> {
    return this.posts.find().exec();
  }

  async create(dto: CreatePostDto): Promise<Post> {
    console.log(dto);
    const post = new this.posts({
      title: dto.title,
      content: dto.content,
      author: dto.author,
      createdAt: new Date(),
    });

    return await post.save();
  }
}
