import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    return this.blogRepository.save(this.blogRepository.create(createBlogDto));
  }

  findAll() {
    return this.blogRepository.find();
  }

  findOne(id: number) {
    return this.blogRepository.findOneBy({ id });
  }

  async update(updateBlogDto: UpdateBlogDto) {
    const blog = await this.findOne(updateBlogDto.id);
    if (!blog) {
      throw new NotFoundException('The blog could not be found');
    }
    const data = {
      ...blog,
      ...updateBlogDto,
    };
    return this.blogRepository.save(this.blogRepository.create(data));
  }

  async remove(id: number) {
    const blog = await this.blogRepository.findOneBy({ id });
    await this.blogRepository.remove(blog);
    return blog;
  }
}
