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
import { Turno } from './turno.entity';

@ApiTags('Turnos')
@Controller('turno')
export class TurnoController {
  constructor(
    private readonly turnoService: TurnoService,
    private readonly turnoGeneratorService: TurnoGeneratorService,
  ) {}

  /**
   * Petición para consultar los datos de un turno que se encuentra en la base de datos.
   * - Se requiere enviar por parámetro el ID del turno.
   * - Incluye información sobre el usuario y cancha asociada.
   */
  @ApiOperation({ summary: 'Obtiene un turno por su ID.' })
  @Get(':id')
  async getTurnoById(@Param('id', ParseUUIDPipe) id: string): Promise<Turno> {
    return await this.turnoService.getTurnoById(id);
  }

  /**
   * Petición para crear turnos a todas las canchas de forma automática y guardarlos en la base de datos.
   * - El turno se crea con su status en LIBRE.
   * - Se rige según el horario de apertura y clausura de la cancha en cuestión.
   * - Se generan cada 2 dias con un margen de 10 dias de turnos.
   * - Solo puede ejecutarla con permiso de Administrador o Super Administrador.
   */
  // @Roles(Role.Superadmin, Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Generacion de turnos.' })
  @Get('/turnos/create')
  async turnGenerete() {
    console.log('entando al /create');
    return this.turnoGeneratorService.generateTurnos();
  }

  /**
   * Petición para consultar los datos estadisticos de turnos.
   * - Devuelve datos por año, mes y estado de reserva.
   */
  // @Roles(Role.Superadmin, Role.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Estadisticas para turnos' })
  @Get('/stats/turno')
  async getTurnoEstadistica() {
    return this.turnoService.getTurnoEstadistica();
  }

  /**
   * Petición para reservar un turno.
   * - El turno queda reservado en estado PENDIENTE hasta que se registre el pago de la reserva.
   * - Solo puede ejecutarla con permiso de Usuario.
   * - Se requiere Token para acceder.
   * - Se notifica via mail la reserva.
   */
  @ApiOperation({ summary: 'Reserva de turnos.' })
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async takeTurnos(@Body() data: any) {
    const { turnoId, userId } = data;
    return await this.turnoService.takeTurno(turnoId, userId);
  }
  /**
   * Petición para cancelar un turno.
   * - El turno pasa al estado de LIBRE cuando es cancelado.
   * - Se requiere el ID del turno.
   * - Solo puede ejecutarla con permiso de Usuario.
   * - Se requiere Token para acceder.
   */
  @ApiOperation({ summary: 'Cancelación de turnos.' })
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async cancelTurno(@Param('id', ParseUUIDPipe) id: string) {
    return await this.turnoService.cancelTurno(id);
  }

  /**
   * Petición para confirmar el pago de la reserva del turno.
   * - Se requiere el ID del turno.
   * - El turno pasa al estado de OCUPADO.
   */
  @ApiOperation({ summary: 'Confirmación de pago.' })
  @Get('/payments/turno/:id')
  async getPaymentTurno(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    return await this.turnoService.paymentFinish(id, res);
  }

  /**
   * Petición para cambiar el estado de un turno que no fue pago.
   * - Se requiere el ID del turno.
   * - El turno pasa al estado de LIBRE.
   */
  @ApiOperation({ summary: 'Cancelación de turno por falta de pago.' })
  @Get('/payments/turno/not/:id')
  async notPayment(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    return await this.turnoService.notPayment(id, res);
  }
}
