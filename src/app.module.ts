import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blog', {
      auth: { username: 'root', password: 'example' },
      authSource: 'admin',
    }),
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
