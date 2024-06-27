import { Module } from '@nestjs/common';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryService } from './cloudinary.service';

@Module({
    providers: [CloudinaryConfig, CloudinaryService],
    exports: [CloudinaryService],
})
export class CloudinaryModule { }
