import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards, HttpCode,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@UseGuards(AuthGuard)
@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Post('create')
  create(@Body() createBlogDto: CreateBlogDto, @Headers() headers: Headers) {
    const id = this.authService.verifyToken(headers['authorization']);
    return this.blogService.create({ ...createBlogDto, author: id });
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Post('update')
  update(@Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
