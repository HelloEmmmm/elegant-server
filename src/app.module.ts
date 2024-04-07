import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { UsersEntity } from './modules/users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'rm-cn-lbj3lidsg000jjoo.rwlb.rds.aliyuncs.com',
      port: 5432,
      username: 'riches_chiu',
      password: 'Phoenix482642',
      database: 'elegant_database',
      entities: [UsersEntity],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
