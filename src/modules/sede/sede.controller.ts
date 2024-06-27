import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { SedeService } from './sede.service';
import { CreateSedeDto } from './dto/createSede.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Sede')
@Controller('sede')
export class SedeController {
  constructor(
    private readonly sedeService: SedeService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @ApiOperation({ summary: 'Get all sedes', description: 'Get all sedes' })
  @Get()
  async getSedes() {
    return await this.sedeService.getSedes();
  }

  @ApiOperation({ summary: 'Get sede by id', description: 'Get sede by id' })
  @Get(':id')
  async getSede(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sedeService.getSedeById(id);
  }

  @ApiOperation({ summary: 'Create sede', description: 'Create sede' })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createSede(
    @Body() sede: any,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) throw new Error('No se ha subido ningún archivo');

    const uploadResult = await this.cloudinaryService.uploadImage(file);
    const imgUrl = uploadResult.secure_url;
    return await this.sedeService.createSede({ ...sede, imgUrl });
  }

  @ApiOperation({ summary: 'Delete sede by id', description: 'Delete sede by id' })
  @Delete(':id')
  async deleteSede(@Param('id', ParseUUIDPipe) id: string) {
    await this.sedeService.deleteSedeByid(id);
    return `Sede with id ${id} was deleted successfully`;
  }
}
