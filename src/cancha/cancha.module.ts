import { Module } from '@nestjs/common';
import { CanchaController } from './cancha.controller';
import { CanchaService } from './cancha.service';

@Module({
  controllers: [CanchaController],
  providers: [CanchaService]
})
export class CanchaModule {}
