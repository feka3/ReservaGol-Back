import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { TurnoRepository } from '../turno/turno.repository';
import { EmailService } from '../email/email.service';
import { Status } from '../turno/status.enum';
import { Turno } from '../turno/turno.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Turno) private turnoRepository: Repository<Turno>,
    private readonly emailService: EmailService,
  ) {
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
  async changeStatusTurn(id) {
    const turno = await this.turnoRepository.findOne({
      where: { id: id },
      relations: ['cancha', 'user'],
    });

    if (!turno) throw new Error('El turno no existe');
    if (turno.status === Status.Ocupado)
      throw new Error('El turno ya se encuentra ocupado');
    turno.status = Status.Ocupado;
    await this.turnoRepository.save(turno);
    const userFinded = turno.user;
    const emailSubject = 'Turno reservado con éxito';
    const emailText = `Hola ${userFinded.name}, tu turno ha sido reservado para el día ${turno.date} a las ${turno.time}. Te recordamos que debe efectuarse el pago de la reserva para que quede confirmado.`;
    const emailHtml = `<p>Hola ${userFinded.name},</p><p>Tu turno ha sido reservado para el día <strong>${turno.date}</strong> a las <strong>${turno.time}</strong>.</p><p>Te recordamos que debe efectuarse el pago de la reserva para que quede confirmado.</p>`;

    await this.emailService.sendEmail(
      userFinded.email,
      emailSubject,
      emailText,
      emailHtml,
    );
    const frontendUrl = `${process.env.FRONTEND_URL}/PagoSuccess`;
    return {
      messaje: 'El turno ha sido reservado correctamente',
      ulr: frontendUrl,
    };
  }
}
