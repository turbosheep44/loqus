import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreatePostDto,
  ID,
  PageInfo,
  SortInfo,
  UpdatePostDto,
} from './post.dto';
import { Post } from './post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private posts: Model<Post>) {}

  async findAll(
    pageInfo: PageInfo,
    search: string,
    sort: SortInfo,
  ): Promise<Post[]> {
    const query = search
      ? {
          $or: [
            { title: { $regex: `.*${search}.*`, $options: 'i' } },
            { content: { $regex: `.*${search}.*`, $options: 'i' } },
          ],
        }
      : {};

    return this.posts
      .find()
      .sort({
        [sort.sortBy]: sort.sortDirection,
      })
      .skip((pageInfo.page - 1) * pageInfo.pageSize)
      .limit(pageInfo.pageSize)
      .where(query)
      .exec();
  }

  async find(id: ID): Promise<Post> {
    const post = await this.posts.findById(id).exec();
    if (post == null) throw new NotFoundException();

    return post;
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

  async update(id: ID, dto: UpdatePostDto): Promise<Post> {
    const post = await this.posts.findById(id).exec();
    if (post == null) throw new NotFoundException();

    post.title = dto.title;
    post.content = dto.content;

    return await post.save();
  }

  async delete(id: ID): Promise<void> {
    const result = await this.posts.findByIdAndDelete(id);
    if (result == null) console.warn(`could not delete post [${id}] not found`);
  }
}
