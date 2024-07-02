import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TurnoDto } from './turno.dto';
import { TurnoService } from './turno.service';

@ApiTags('Turnos')
@Controller('turno')
export class TurnoController {

    constructor(private readonly turnoService: TurnoService) {}

    @Post()
    async createTurno(@Body() turno: TurnoDto) {
        return await this.turnoService.createTurno(turno)
    }
    
}
