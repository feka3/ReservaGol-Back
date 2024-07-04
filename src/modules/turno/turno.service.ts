import { Injectable } from '@nestjs/common';
import { TurnoDto } from './turno.dto';
import { TurnoRepository } from './turno.repository';

@Injectable()
export class TurnoService {

    constructor(private readonly turnoRepository: TurnoRepository) { }

    async createTurno(turno, user) {
        return await this.turnoRepository.createTurno(turno, user)
    }

    async getTurnoById(id: string) {
        return await this.turnoRepository.getTurnoById(id)
    }

    async cancelTurno(id: string) {
        return await this.turnoRepository.cancelTurno(id)
    }
}
