import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TurnoDto } from './turno.dto';
import { TurnoService } from './turno.service';
import { TurnoGeneratorService } from './turnoGenerator.service';
@ApiTags('Turnos')
@Controller('turno')
export class TurnoController {
  constructor(
    private readonly turnoService: TurnoService,
    private readonly turnoGeneratorService: TurnoGeneratorService,
  ) {}

  @Get(':id')
  async getTurnoById(@Body('id') id: string) {
    console.log('entrando al id');
    return await this.turnoService.getTurnoById(id);
  }
  @Get('/turnos/create')
  async turnGenerete() {
    console.log('entando al /create');
    return this.turnoGeneratorService.generateTurnos();
  }

  @Post()
  async createTurno(@Body() turno: TurnoDto) {
    return await this.turnoService.createTurno(turno);
  }

  @Delete(':id')
  async cancelTurno(@Body('id') id: string) {
    return await this.turnoService.cancelTurno(id);
  }
}
