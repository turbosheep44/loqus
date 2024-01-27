import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty() title: string;
  @IsNotEmpty() content: string;
  @IsNotEmpty() author: string;
}

export class UpdatePostDto {
  @IsNotEmpty() title: string;
  @IsNotEmpty() content: string;
}

/**
 * a string identifier which must be a valid MongoDB ID
 */
export type ID = string;

export class PageInfo {
  @IsPositive() page: number = 1;
  @IsPositive() pageSize: number = 10;
}
