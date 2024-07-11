import { Injectable } from '@nestjs/common';
import { TurnoRepository } from './turno.repository';

@Injectable()
export class TurnoService {
  constructor(private readonly turnoRepository: TurnoRepository) {}

  async takeTurno(turnoId, userId) {
    return await this.turnoRepository.takeTurno(turnoId, userId);
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
  async notPayment(id, res) {
    return await this.turnoRepository.notPayment(id, res);
  }

  async getTurnoEstadistica(){
    return await this.turnoRepository.getTurnoEstadistica()
  }
}
