import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty() title: string;
  @IsNotEmpty() content: string;
  @IsNotEmpty() author: string;
}

export class UpdatePostDto {
  @IsNotEmpty() title: string;
  @IsNotEmpty() content: string;
}
