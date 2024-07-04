import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TurnoService } from './turno.service';
import { TurnoGeneratorService } from './turnoGenerator.service';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from '../user/roles.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Turnos')
@Controller('turno')
export class TurnoController {
  constructor(
    private readonly turnoService: TurnoService,
    private readonly turnoGeneratorService: TurnoGeneratorService,
  ) {}
  @ApiOperation({ summary: 'Se obtiene turno por id' })
  @Get(':id')
  async getTurnoById(@Body('id') id: string) {
    return await this.turnoService.getTurnoById(id);
  }
  @ApiOperation({
    summary: 'Genera turnos para todas las canchas',
    description:
      'Llegado el caso se puede acceder a esta ruta para actualizar y ponerle turnos a todas las cancahs de la base de datos, automaticamete se generan cada 2 dias con un margen de 10 dias de turnos segun los horarios de cada cancha',
  })
  @Roles(Role.Superadmin, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/turnos/create')
  async turnGenerete() {
    console.log('entando al /create');
    return this.turnoGeneratorService.generateTurnos();
  }
  @ApiOperation({ summary: 'El usuario toma el turno' })
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async takeTurnos(@Body() data: any) {
    const { turno, user } = data;
    console.log(turno);
    return await this.turnoService.takeTurno(data.turno, data.user);
  }
  @ApiOperation({ summary: 'El usuario cancela su turno' })
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async cancelTurno(@Body('id') id: string) {
    return await this.turnoService.cancelTurno(id);
  }
  @Get('/payments/turno/:id')
  async getPaymentTurno(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    return await this.turnoService.paymentFinish(id, res);
  }
}
