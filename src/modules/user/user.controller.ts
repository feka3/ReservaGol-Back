
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

    @Get()
    async getUsers() {
        return this.userService.getUsers()
    }
        
    @Get(":id")
    async getUserById(@Param("id") id: string) {
        return await this.userService.getUserById(id);
    }

    @Put(":id")
    async updateUserById(@Param("id", ParseUUIDPipe) id: string, @Body() user: Partial<User>, @UploadedFile() file: Express.Multer.File) {
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        const imgFile = uploadResult.secure_url;
    
        return await this.userService.updateUserById({ ...user, imgFile }, id);
      }

}
