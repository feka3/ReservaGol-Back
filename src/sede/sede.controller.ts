import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { SedeService } from './sede.service';
import { Venue } from './sede.entity';

@Controller('sede')
export class SedeController {
  constructor(private readonly sedeService: SedeService) {}
  @Get()
  async getSedes() {
    return await this.sedeService.getSedes();
  }
  @Get('seeder')
  async addSedesDefoult() {
    return await this.sedeService.addSedesDefoult();
  }
  @Get(':id')
  async getSede(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sedeService.getSedeById(id);
  }

  @Post('create')
  async createSede(@Body() venue: Venue) {
    return await this.sedeService.createSede(venue);
  }
  @Delete(':id')
  async deleteSede(@Param('id', ParseUUIDPipe) id: string) {
    await this.sedeService.deleteSedeByid(id);
    return 'sede deleted';
  }
}
