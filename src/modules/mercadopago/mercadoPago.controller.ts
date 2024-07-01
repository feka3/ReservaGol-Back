// import { Controller, Post, Body } from '@nestjs/common';
// import { MercadoPagoService } from './mercadoPago.service';

// @Controller('payments')
// export class PaymentsController {
//   constructor(private readonly mercadoPagoService: MercadoPagoService) {}

//   @Post('create-preference')
//   async createPreference(@Body() createPreferenceDto: any) {
//     const { items, backUrls } = createPreferenceDto;
//     const initPoint = await this.mercadoPagoService.createPreference(
//       items,
//       backUrls,
//     );
//     return { initPoint };
//   }
// }
