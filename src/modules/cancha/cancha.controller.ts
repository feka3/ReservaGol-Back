import { Controller, Get, Param } from '@nestjs/common';
import { CanchaService } from './cancha.service';
import { UUID } from 'crypto';

@Controller('cancha')
export class CanchaController {
  constructor(private readonly canchaService: CanchaService) {}

  @Get(':id')
  async getCanchaByid(@Param('id') id: UUID) {
    return this.canchaService.getCanchaByid(id);
  }
}
