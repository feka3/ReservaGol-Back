import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post
} from '@nestjs/common';
import { SedeService } from './sede.service';
import { CreateSedeDto } from './dto/createSede.dto';

@Controller('sede')
export class SedeController {
  constructor(private readonly sedeService: SedeService) { }

  @Get()
  async getSedes() {
    return await this.sedeService.getSedes();
  }


  @Get(':id')
  async getSede(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sedeService.getSedeById(id);
  }

  @Post()
  async createSede(
    @Body() venue: CreateSedeDto,
  ) {

    return await this.sedeService.createSede(venue);
  }

  @Delete(':id')
  async deleteSede(@Param('id', ParseUUIDPipe) id: string) {
    await this.sedeService.deleteSedeByid(id);
    return 'sede deleted';
  }
}
