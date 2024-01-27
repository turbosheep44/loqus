import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) content: string;
  @Prop({ required: true }) author: string;
  @Prop({ required: true }) createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
