import { Controller, Post, Body } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private mercadoPagoService: MercadoPagoService) {}

  @Post('create_preference')
  async createPreference(@Body() createPreferenceDto: any) {
    return await this.mercadoPagoService.createPreference(createPreferenceDto);
  }
}
