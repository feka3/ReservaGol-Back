import { Module } from '@nestjs/common';
import { CloudinaryConfig } from 'src/config/cloudinary';

@Module({
    providers: [CloudinaryConfig],
    exports: [CloudinaryConfig],
})
export class CloudinaryModule { }
