import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { CanchaService } from './cancha.service';
import { UUID } from 'crypto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { canchaDto, updatecanchaDto } from './cancha.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Cancha')
@Controller('cancha')
export class CanchaController {
  constructor(
    private readonly canchaService: CanchaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @ApiOperation({
    summary: 'Get cancha by id',
    description: 'Trae una cancha por su id a traves de param',
  })
  @Get(':id')
  async getCanchaByid(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.canchaService.getCanchaByid(id);
  }
  @ApiOperation({
    summary: 'Get all canchas',
    description: 'Trae todas las canchas',
  })
  @Get()
  async getCanchas() {
    return this.canchaService.getCanchas();
  }

  @Get('deporte/:deporte')
  async getCanchaDeporte(@Param('deporte', ParseIntPipe) deporte: number) {
    return this.canchaService.getCanchaDeporte(deporte);
  }

  @ApiOperation({
    summary: 'Create a cancha',
    description: 'Crea una cancha con una imagen opcional',
  })
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
  @ApiOperation({
    summary: 'Update a cancha',
    description: 'Actualiza una cancha por su id',
  })
  @Put(':id')
  async updateCancha(
    @Body() cancha: updatecanchaDto,
    @Param('id', ParseUUIDPipe) id: UUID,
  ) {
    return this.canchaService.updateCancha(id, cancha);
  }
  @ApiOperation({
    summary: 'Delete a cancha',
    description: 'Elimina una cancha por su id',
  })
  @Delete(':id')
  async deleteCancha(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.canchaService.deleteCancha(id);
  }
}
