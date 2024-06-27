import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { CanchaService } from './cancha.service';
import { UUID } from 'crypto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { canchaDto } from './cancha.dto';

@ApiTags('Cancha')
@Controller('cancha')
export class CanchaController {
  constructor(private readonly canchaService: CanchaService) {}

  @Get(':id')
  async getCanchaByid(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.canchaService.getCanchaByid(id);
  }
  @Get()
  async getCanchas() {
    return this.canchaService.getCanchas();
  }

  @Post()
  @ApiBody({
    description: 'Create a cancha',
  })
  async createCancha(@Body() cancha: canchaDto) {
    console.log(cancha);
    return this.canchaService.createCancha(cancha);
  }
}
