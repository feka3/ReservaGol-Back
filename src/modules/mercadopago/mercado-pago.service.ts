import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor(private configService: ConfigService) {
    this.client = new MercadoPagoConfig({
      accessToken: this.configService.get<string>('ACCESS_TOKEN'),
    });
  }

  async createPreference(items: any) {
    const body = {
      items: items.map((item) => ({
        title: item.title,
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        currency_id: 'ARS',
      })),
      back_urls: {
        success: 'https://www.ignacio.website',
        failure: 'https://www.ignacio.website',
        pending: 'https://www.ignacio.website',
      },
      auto_return: 'approved',
    };

    try {
      const preference = await new Preference(this.client).create({ body });
      return { redirectUrl: preference.init_point };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
