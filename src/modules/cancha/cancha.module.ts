import { Module } from '@nestjs/common';
import { CanchaController } from './cancha.controller';
import { CanchaService } from './cancha.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { canchaRepository } from './cancha.repository';
import { Cancha } from './cancha.entity';
import { Sede } from '../sede/sede.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cancha, Sede]), CloudinaryModule],
  controllers: [CanchaController],
  providers: [CanchaService, canchaRepository],
})
export class CanchaModule {}
