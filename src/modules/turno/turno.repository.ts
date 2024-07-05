import { Injectable, NotFoundException } from '@nestjs/common';
import { TurnoDto } from './turno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './turno.entity';
import { User } from '../user/user.entity';
import { Cancha } from '../cancha/cancha.entity';
import { Status } from './status.enum';
import { EmailService } from '../email/email.service';

@Injectable()
export class TurnoRepository {
  constructor(
    @InjectRepository(Turno) private turnoRepository: Repository<Turno>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Cancha) private canchaRepository: Repository<Cancha>,
    private readonly emailService: EmailService,
  ) {}

  async takeTurno(turno: Turno, user: User) {
    const userFinded = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!userFinded) throw new NotFoundException('no se encontro usuario');

    const turnodb = await this.turnoRepository.findOne({
      where: { id: turno.id },
    });
    if (!turnodb) throw new NotFoundException('no se encontro turno');
    if (turnodb.status != Status.Libre)
      throw new NotFoundException('turno reservado');

    turnodb.user = userFinded;
    turnodb.status = Status.Pendiente;

    await this.turnoRepository.update(turnodb.id, turnodb);

    return 'El turno esta en proceso de pago';
  }

  async cancelTurno(id: string) {
    const turnoFinded = await this.turnoRepository.findOne({
      where: { id: id },
      relations: ['cancha', 'user'],
    });

    if (!turnoFinded)
      return new NotFoundException('El turno que desea cancelar no existe');

    turnoFinded.status = Status.Libre;
    await this.turnoRepository.save(turnoFinded);

    const emailSubject = 'Turno cancelado con exito';
    const emailText = `Hola ${turnoFinded.user.name}, tu turno para el día ${turnoFinded.date} a las ${turnoFinded.time} ha sido cancelado.`;
    const emailHtml = `<p>Hola ${turnoFinded.user.name},</p><p>Tu turno para el día <strong>${turnoFinded.date}</strong> a las <strong>${turnoFinded.time}</strong> ha sido cancelado.</p>`;

    await this.emailService.sendEmail(
      turnoFinded.user.email,
      emailSubject,
      emailText,
      emailHtml,
    );

    return `El turno con id: ${turnoFinded.id} ha sido cancelado con éxito.`;
  }

  async getTurnoById(id: string) {
    const turnoFinded = await this.turnoRepository.findOne({
      where: { id: id },
      relations: ['cancha', 'user'],
    });

    if (!turnoFinded)
      return new NotFoundException(`El turno no existe para el ID: ${id}`);
    console.log(turnoFinded);
    return turnoFinded;
  }
  async paymentFinish(id, res) {
    let turnoPayment = await this.turnoRepository.findOne({
      where: { id: id },
    });
    turnoPayment.status = Status.Ocupado;
    await this.turnoRepository.save(turnoPayment);
    return res.redirect(`${process.env.FRONTEND_URL}/PagoSuccess`);
  }
}
