import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor(private configService: ConfigService) {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    });
  }
  async createPreference({ preference, turno }) {
    const item = { preference, turno };
    const body = {
      items: [
        {
          id: item.preference.id,
          title: item.preference.title,
          quantity: 1,
          unit_price: Number(item.preference.price),
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success: `${process.env.PUBLIC_API_URL}/payments/turno/${turno.id}`,
        failure: `${process.env.PUBLIC_API_URL}/`,
        pending: `${process.env.PUBLIC_API_URL}/`,
      },
      auto_return: 'approved',
    };

    try {
      const preference = await new Preference(this.client).create({ body });

      console.log(preference);
      return { preferenceId: preference.id };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
