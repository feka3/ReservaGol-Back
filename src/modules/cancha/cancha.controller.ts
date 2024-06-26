import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CanchaService } from './cancha.service';
import { UUID } from 'crypto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { Court } from './cancha.entity';
import { courtDto } from './cancha.dto';
import { Express } from 'express';
import { Multer } from 'multer';

@Controller('cancha')
export class CanchaController {
  constructor(private readonly canchaService: CanchaService) {}

  @Get(':id')
  async getCanchaByid(@Param('id') id: UUID) {
    return this.canchaService.getCanchaByid(id);
  }
  @Get()
  async getCanchas() {
    return this.canchaService.getCanchas();
  }

  @Post()
  @ApiBody({
    description: 'Create a court',
  })
  async createCancha(@Body() court: courtDto) {
    console.log(court);
    return this.canchaService.createCancha(court);
  }
}
