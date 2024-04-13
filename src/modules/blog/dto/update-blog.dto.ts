import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  title: string;

  content: string;
}
