import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from './guards/auth.guard';
import { RequestLoggerMiddleware } from './middleware/logger';
import { PostModule } from './post/post.module';
import { TokenModule } from './token/token.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      inject: [JwtService],
      useFactory: (jwtService: JwtService) => {
        return new AuthGuard(jwtService, [
          ['GET', /\/token/],
          ['GET', /\/post/],
          ['GET', /\/post\/\w+/],
        ]);
      },
    },
  ],
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
    TokenModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('/*');
  }
}
