import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DB_URL ?? 'mongodb://localhost:27017/blog',
      {
        auth: {
          username: process.env.DB_USER ?? 'root',
          password: process.env.DB_PASS ?? 'example',
        },
        authSource: 'admin',
      },
    ),
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
