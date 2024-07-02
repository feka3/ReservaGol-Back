import { Module } from '@nestjs/common';
import { CanchaController } from './cancha.controller';
import { CanchaService } from './cancha.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanchaRepository } from './cancha.repository';
import { Cancha } from './cancha.entity';
import { Sede } from '../sede/sede.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { SedeRepository } from '../sede/sede.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cancha, Sede]), CloudinaryModule],
  controllers: [CanchaController],
  providers: [CanchaService, CanchaRepository],
})
export class CanchaModule {}
