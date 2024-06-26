import { Module } from '@nestjs/common';
import { CanchaController } from './cancha.controller';
import { CanchaService } from './cancha.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Court } from './cancha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Court])],
  controllers: [CanchaController],
  providers: [CanchaService]
})
export class CanchaModule {}
