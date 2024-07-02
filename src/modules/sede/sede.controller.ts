import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SedeService } from './sede.service';
import { CreateSedeDto } from './dto/createSede.dto';
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
  // @ApiBearerAuth()
  // @Roles(Role.Superadmin, Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  async createSede(
    @Body() sedeConUser: any,
    @UploadedFile() file: Express.Multer.File,
  ) {

    try {

      const { data, userDB } = sedeConUser;

      const user = userDB.userDb;
      const sede: CreateSedeDto = data;
      sede.user = user.id;
      if (!file) {
        return this.sedeService.createSede(sede);
      }

      const uploadResult = await this.cloudinaryService.uploadImage(file);
      const imgUrl = uploadResult.secure_url;
      return await this.sedeService.createSede({ ...sede, imgUrl });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @ApiOperation({
    summary: 'Delete sede by id',
    description: 'Delete sede by id',
  })
  @Delete(':id')
  async deleteSede(@Param('id', ParseUUIDPipe) id: string) {
    await this.sedeService.deleteSedeByid(id);
    return `La sede con id: ${id} ha sido eliminada correctamente`;
  }
}
