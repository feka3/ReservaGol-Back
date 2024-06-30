import { Module } from '@nestjs/common';
import { SedeController } from './sede.controller';
import { SedeService } from './sede.service';
import { SedeRepository } from './sede.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sede } from './sede.entity';
import { Cancha } from '../cancha/cancha.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sede, Cancha]), CloudinaryModule],
  controllers: [SedeController],
  providers: [SedeService, SedeRepository],
})
export class SedeModule { }
