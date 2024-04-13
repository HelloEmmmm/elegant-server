import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Blog } from '../../blog/entities/blog.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ nullable: true })
  age?: number;

  @Column()
  username: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // 创建时间字段
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // 更新时间字段
  updatedAt: Date;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); // 使用bcrypt对密码进行哈希
  }

  @Column({ default: false })
  emailVerified: boolean;

  @ManyToOne(() => Blog, (blog) => blog.author)
  blogs: any;
}
