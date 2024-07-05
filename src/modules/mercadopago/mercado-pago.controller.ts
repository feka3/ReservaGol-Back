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

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private mercadoPagoService: MercadoPagoService) {}

  @Post('create_preference')
  async createPreference(@Body() { preference, turno }: any) {
    return await this.mercadoPagoService.createPreference({
      preference,
      turno,
    });
  }
  @Get('turno/:id')
  async changeStatusTurn(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.mercadoPagoService.changeStatusTurn(id);
  }
}
