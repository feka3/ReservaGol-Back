import { Injectable } from '@nestjs/common';
import { TurnoRepository } from './turno.repository';

@Injectable()
export class TurnoService {
  constructor(private readonly turnoRepository: TurnoRepository) {}

  async takeTurno(turno, user) {
    return await this.turnoRepository.takeTurno(turno, user);
  }
  async paymentFinish(id, res) {
    return await this.turnoRepository.paymentFinish(id, res);
  }
  async getTurnoById(id: string) {
    return await this.turnoRepository.getTurnoById(id);
  }

  async cancelTurno(id: string) {
    return await this.turnoRepository.cancelTurno(id);
  }
}
