
import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'mercadopago';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Usuario')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService) { }

    /**
     * Petición para consultar el listado de todos los usuarios que se encuentran en la base de datos.
     * - Incluye la información de los turnos y sedes asociadas según corresponda.
     */
    @ApiOperation({ summary: 'Listado de usuarios' })
    @Get()
    async getUsers() {
        return this.userService.getUsers()
    }

    /**
     * Petición para consultar el listado de todos los cancheros que estan pendientes de aprobacion.
     */
    @ApiOperation({ summary: 'Cancheros pendientes de aprobacion' })
    @Get("cancheros")
    async getCancheros() {
        try {
            return await this.userService.getCancheros();
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    /**
     * Petición para consultar los datos de un usuario que se encuentra en la base de datos.
     * - Se requiere enviar por parámetro el ID del usuario.
     * - Incluye la información de los turnos y sedes asociadas según corresponda.
     * 
     */
    @ApiOperation({ summary: 'Información de usuario' })
    @Get(":id")
    async getUserById(@Param("id") id: string) {
        return await this.userService.getUserById(id);
    }

    /**
     * Petición para madificar los datos de un usuario que se encuentra en la base de datos.
     * - Se requiere enviar por parámetro el ID del usuario.
     * - No es necesario enviar todos los datos, solo los que desea modificar.
     * - Se puede cargar una imagen de perfil.
     */
    @ApiOperation({ summary: 'Modificación de usuario' })
    @Put(":id")
    @UseInterceptors(FileInterceptor('file'))
    async updateUserById(@Param("id", ParseUUIDPipe) id: string, @Body() user: Partial<User>, @UploadedFile() file: Express.Multer.File) {
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        const imgFile = uploadResult.secure_url;

        return await this.userService.updateUserById({ ...user, imgFile }, id);
    }


    /**
     * Petición para aprobar un canchero (cambiar rol de pendiente a admin)
     * - Se requiere enviar por parámetro el ID del canchero.
     */
    @ApiOperation({ summary: "Aprobar canchero (cambiar rol de pendiente a admin)" })
    @Post("canchero/:id")
    async approveCanchero(@Param("id", ParseUUIDPipe) id: string) {
        return await this.userService.approveCanchero(id);
    }
}
