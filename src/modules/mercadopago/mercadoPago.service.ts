// import { Injectable } from '@nestjs/common';
// import mercadopago from 'mercadopago';

// @Injectable()
// export class MercadoPagoService {
//   constructor() {
//     mercadopago.configure({
//       access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
//     });
//   }

//   async createPreference(items: any[], backUrls: { success: string, failure: string, pending: string }) {
//     const preference = {
//       items,
//       back_urls: backUrls,
//       auto_return: 'approved',
//     };

//     try {
//       const response = await mercadopago.preferences.create(preference);
//       return response.body.init_point;
//     } catch (error) {
//       console.error('Error creating preference:', error);
//       throw error;
//     }
//   }
// }
