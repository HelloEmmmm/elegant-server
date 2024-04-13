import { MaxLength } from 'class-validator';

export class CreateBlogDto {
  @MaxLength(20)
  title: string;

  author: number;

  content?: string;
}
