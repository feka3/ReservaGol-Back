import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TurnoDto } from './turno.dto';
import { TurnoService } from './turno.service';

@ApiTags('Turnos')
@Controller('turno')
export class TurnoController {

    constructor(private readonly turnoService: TurnoService) {}

    @Get(":id")
    async getTurnoById(@Body('id') id: string) {
        return await this.turnoService.getTurnoById(id)
    }
    
    @Post()
    async createTurno(@Body() turno: TurnoDto) {
        return await this.turnoService.createTurno(turno)
    }

    @Delete(":id")
    async cancelTurno(@Body('id') id: string) {
        return await this.turnoService.cancelTurno(id)
    }
    
}
