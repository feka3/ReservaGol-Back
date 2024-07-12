import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { EmailService } from '../email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CloudinaryModule],
  providers: [UserService, UserRepository, EmailService],
  controllers: [UserController],
})
export class UserModule {}
