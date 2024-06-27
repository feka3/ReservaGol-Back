import { Module } from '@nestjs/common';
import { CanchaController } from './cancha.controller';
import { CanchaService } from './cancha.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { canchaRepository } from './cancha.repository';
import { Cancha } from './cancha.entity';
import { Sede } from '../sede/sede.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cancha, Sede])],
  controllers: [CanchaController],
  providers: [CanchaService, canchaRepository],
})
export class CanchaModule { }
