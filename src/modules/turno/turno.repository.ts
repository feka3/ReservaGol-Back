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
    console.log(user.id);
    console.log(turno.id);
    console.log(user);
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

    const emailSubject = 'Turno reservado con éxito';
    const emailText = `Hola ${userFinded.name}, tu turno ha sido reservado para el día ${turno.date} a las ${turno.time}. Te recordamos que debe efectuarse el pago de la reserva para que quede confirmado.`;
    const emailHtml = `<p>Hola ${userFinded.name},</p><p>Tu turno ha sido reservado para el día <strong>${turno.date}</strong> a las <strong>${turno.time}</strong>.</p><p>Te recordamos que debe efectuarse el pago de la reserva para que quede confirmado.</p>`;

    await this.emailService.sendEmail(
      userFinded.email,
      emailSubject,
      emailText,
      emailHtml,
    );

    await this.turnoRepository.update(turnodb.id, turnodb);

    return 'El turno fue reservado con exito';
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

    // await this.emailService.sendEmail(turnoFinded.user.email, emailSubject, emailText, emailHtml);
    await this.emailService.sendEmail(
      'imogene.bergstrom79@ethereal.email',
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

    return turnoFinded;
  }
}
