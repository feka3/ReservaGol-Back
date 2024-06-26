import { Module } from '@nestjs/common';
import { CanchaController } from './cancha.controller';
import { CanchaService } from './cancha.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court } from './cancha.entity';
import { canchaRepository } from './cancha.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Court])],
  controllers: [CanchaController],
  providers: [CanchaService, canchaRepository],
})
export class CanchaModule {}
