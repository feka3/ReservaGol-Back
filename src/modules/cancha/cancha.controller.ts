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
import { canchaDto, updateCanchaDto } from './cancha.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Cancha')
@Controller('cancha')
export class CanchaController {
  constructor(
    private readonly canchaService: CanchaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /**
   * Petición para obtener los datos de un cancha.
   * - Se requier el ID de la cancha.
   */
  @ApiOperation({ summary: 'Consulta datos de una cancha.' })
  @Get(':id')
  async getCanchaByid(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.canchaService.getCanchaByid(id);
  }

  /**
   * Petición para obtener los datos de todas las canchas.
   */
  @ApiOperation({ summary: 'Obtiene todas las canchas.' })
  @Get()
  async getCanchas() {
    return this.canchaService.getCanchas();
  }

  /**
   * Petición para obtener los datos de todas las canchas según el deporte.
   * - Se requiere el numero identificador del deporte a consultar.
   */
  @ApiOperation({ summary: 'Obtiene todas las canchas según deporte.' })
  @Get('deporte/:deporte')
  async getCanchaDeporte(@Param('deporte', ParseIntPipe) deporte: number) {
    return this.canchaService.getCanchaDeporte(deporte);
  }

  /**
   * Petición para crear una cancha..
   * - Se requiere el numero identificador del deporte a consultar.
   */
  @ApiOperation({ summary: 'Creación de una cancha.' })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createCancha(
    @Body() cancha: canchaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      const imgUrl = null;
      return this.canchaService.createCancha(cancha, imgUrl);
    }
    console.log(cancha, 'estoy aca');
    const uploadResult = await this.cloudinaryService.uploadImageCancha(file);
    const imgUrl = uploadResult.secure_url;
    return this.canchaService.createCancha(cancha, imgUrl);
  }

  /**
   * Petición para actualizar los datos de una cancha.
   * - Solo se requieren los datos a cambiar.
   * - Se puede agregar una imagen.
   */
  @ApiOperation({ summary: 'Actualización de datos de una cancha.' })
  @Put(':id')
  async updateCancha(
    @Body() cancha: updateCanchaDto,
    @Param('id', ParseUUIDPipe) id: UUID,
  ) {
    return this.canchaService.updateCancha(id, cancha);
  }

  /**
   * Petición para eliminar una cancha.
   * - Se requiere el ID de la cancha.
   */
  @ApiOperation({ summary: 'Eliminación de una cancha.' })
  @Delete(':id')
  async deleteCancha(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.canchaService.deleteCancha(id);
  }
  @Get('eliminacion/pausa/cancha/:canchaId')
  async pausarCancha(@Param('canchaId', ParseUUIDPipe) canchaId: UUID) {
    return this.canchaService.pausarCancha(canchaId);
  }
}
