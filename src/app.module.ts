import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { UserEntity } from './modules/user/entities/user.entity';
import { AuthModule } from "./modules/auth/auth.module";
import { BlogModule } from './modules/blog/blog.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'rm-cn-lbj3lidsg000jjoo.rwlb.rds.aliyuncs.com',
      port: 5432,
      username: 'riches_chiu',
      password: 'Phoenix482642',
      database: 'elegant_database',
      entities: [UserEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
