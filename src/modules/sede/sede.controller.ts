import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SedeService } from './sede.service';
import { CreateSedeDto, UpdateSedeDto } from './dto/createSede.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from '../user/roles.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Sede')
@Controller('sede')
export class SedeController {
  constructor(
    private readonly sedeService: SedeService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  /**
   * Petición para consultar todas las sedes que se encuentra en la base de datos.
   * - Incluye información sobre el usuario, cancha y los turnos asociados a esa sede.
   */
  @ApiOperation({ summary: 'Consultar todas las sedes.' })
  @Get()
  async getSedes() {
    return await this.sedeService.getSedes();
  }

  /**
   * Petición para consultar los datos de una sede que se encuentra en la base de datos.
   * - Se requiere enviar por parámetro el ID de la sede.
   * - Incluye información sobre el usuario, cancha y los turnos asociados a esa sede.
   */
  @ApiOperation({ summary: 'Consultar datos de una sede.' })
  @Get(':id')
  async getSede(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sedeService.getSedeById(id);
  }

  /**
   * Petición para crear una sede.
   * - Se puede cargar imagen.
   * - Se requiere rol de Administrador o Super Administrador.
   * - Se requiere Token para acceder.
   */
  @ApiOperation({ summary: 'Creación de una sede.' })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @Roles(Role.Superadmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async createSede(
    @Body() formData: CreateSedeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        throw new NotFoundException('File not found');
      }

      const uploadResult = await this.cloudinaryService.uploadImage(file);
      const imgUrl = uploadResult.secure_url;
      return await this.sedeService.createSede({ ...formData, imgUrl });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * Petición para madificar los datos de una sede que se encuentra en la base de datos.
   * - Se requiere enviar por parámetro el ID de la sede.
   * - No es necesario enviar todos los datos, solo los que desea modificar.
   * - Se puede cargar una imagen.
   * - Solo puede ejecutarla con permiso de Admistrador o Super Administrador.
   * - Se requiere Token para acceder.
   */
  @ApiOperation({ summary: 'Actualización de una sede.' })
  @ApiBearerAuth()
  @Roles(Role.Superadmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Put(':id')
  async updateSede(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() formData: UpdateSedeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        return await this.sedeService.updateSede(id, formData);
      }

      const uploadResult = await this.cloudinaryService.uploadImage(file);
      const imgUrl = uploadResult.secure_url;


      return await this.sedeService.updateSede(id, { ...formData, imgUrl });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Petición para eliminar una sede.
   * - Se requiere el ID de la sede.
   * - Solo puede ejecutarla con permiso de Admistrador o Super Administrador.
   * - Se requiere Token para acceder.
   */
  @ApiOperation({ summary: 'Eliminación de una sede.' })
  @ApiBearerAuth()
  @Roles(Role.Superadmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('delete/sede/:id')
  async deleteSede(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sedeService.deleteSedeByid(id);
  }

}