import { IsIn, IsNotEmpty, IsPositive } from 'class-validator';

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

const SORT_FIELDS = ['createdAt', 'title'] as const;
const SORT_DIRECTIONS = ['asc', 'desc'] as const;

export type SortField = (typeof SORT_FIELDS)[number];
export type SortDirection = (typeof SORT_DIRECTIONS)[number];

export class SortInfo {
  @IsIn(SORT_FIELDS) sortBy: SortField = 'createdAt';
  @IsIn(SORT_DIRECTIONS) sortDirection: SortDirection = 'desc';
}
