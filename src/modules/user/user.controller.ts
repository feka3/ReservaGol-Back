
import { Body, Controller, Get, Param, ParseUUIDPipe, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from 'mercadopago';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@ApiTags('Usuario')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService) {}
    
    /**
     * Petición para obtener el listado de todos los usuarios que se encuentran en la base de datos.
     * 
     */
    @Get()
    async getUsers() {
        return this.userService.getUsers()
    }

    /**
     * Petición para obtener los datos de un usuario que se encuentra en la base de datos.
     * - Se requiere enviar por parámetro el ID del usuario.
     * 
     */        
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
    @Put(":id")
    async updateUserById(@Param("id", ParseUUIDPipe) id: string, @Body() user: Partial<User>, @UploadedFile() file: Express.Multer.File) {
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        const imgFile = uploadResult.secure_url;
    
        return await this.userService.updateUserById({ ...user, imgFile }, id);
      }

}
