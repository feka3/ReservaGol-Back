import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { CanchaService } from './cancha.service';
import { UUID } from 'crypto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { canchaDto } from './cancha.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Cancha')
@Controller('cancha')
export class CanchaController {
  constructor(
    private readonly canchaService: CanchaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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
  @UseInterceptors(FileInterceptor('file'))
  async createCancha(
    @Body() cancha: canchaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      const imgUrl = null;
      return this.canchaService.createCancha(cancha, imgUrl);
    }
    const uploadResult = await this.cloudinaryService.uploadImageCancha(file);
    const imgUrl = uploadResult.secure_url;
    return this.canchaService.createCancha(cancha, imgUrl);
  }
}
