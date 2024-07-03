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
  async createPreference(item: any) {
    const body = {
      items: [
        {
          id: '1',
          title: item.title,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success:
          'https://www.google.com/imgres?q=check&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F5%2F50%2FYes_Check_Circle.svg%2F800px-Yes_Check_Circle.svg.png&imgrefurl=https%3A%2F%2Fes.m.wikipedia.org%2Fwiki%2FArchivo%3AYes_Check_Circle.svg&docid=eZxXQH3sHcxP_M&tbnid=Z6rnaBzl2JhFvM&vet=12ahUKEwj-zayJ4omHAxVGpJUCHYINBkoQM3oECHEQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwj-zayJ4omHAxVGpJUCHYINBkoQM3oECHEQAA',
        failure:
          'https://www.google.com/imgres?q=check&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F5%2F50%2FYes_Check_Circle.svg%2F800px-Yes_Check_Circle.svg.png&imgrefurl=https%3A%2F%2Fes.m.wikipedia.org%2Fwiki%2FArchivo%3AYes_Check_Circle.svg&docid=eZxXQH3sHcxP_M&tbnid=Z6rnaBzl2JhFvM&vet=12ahUKEwj-zayJ4omHAxVGpJUCHYINBkoQM3oECHEQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwj-zayJ4omHAxVGpJUCHYINBkoQM3oECHEQAA',
        pending:
          'https://www.google.com/imgres?q=check&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F5%2F50%2FYes_Check_Circle.svg%2F800px-Yes_Check_Circle.svg.png&imgrefurl=https%3A%2F%2Fes.m.wikipedia.org%2Fwiki%2FArchivo%3AYes_Check_Circle.svg&docid=eZxXQH3sHcxP_M&tbnid=Z6rnaBzl2JhFvM&vet=12ahUKEwj-zayJ4omHAxVGpJUCHYINBkoQM3oECHEQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwj-zayJ4omHAxVGpJUCHYINBkoQM3oECHEQAA',

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
