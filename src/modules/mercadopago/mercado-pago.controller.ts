import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { UUID } from 'crypto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Mercado Pago")
@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private mercadoPagoService: MercadoPagoService) {}

  /**
   * Petición para abonar la reserva del turno.
   */
  @ApiOperation({ summary: 'Creacion de preferencia de pago.' })
  @Post('create_preference')
  async createPreference(@Body() { preference, turno }: any) {
    return await this.mercadoPagoService.createPreference({
      preference,
      turno,
    });
  }

  /**
   * Petecion para cambiar el estado de un turno cuando es abonado.
   * - Se requiere el ID del turno. 
   */
  @ApiOperation({ summary: 'Cambio de estado del turno abonado.' })
  @Get('turno/:id')
  async changeStatusTurn(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.mercadoPagoService.changeStatusTurn(id);
  }
}
