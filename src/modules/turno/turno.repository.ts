import { Injectable, NotFoundException } from "@nestjs/common";
import { TurnoDto } from "./turno.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Turno } from "./turno.entity";
import { User } from "../user/user.entity";
import { Cancha } from "../cancha/cancha.entity";
import { Status } from "./status.enum";

@Injectable()
export class TurnoRepository {

    constructor(
        @InjectRepository(Turno) private turnoRepository: Repository<Turno>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Cancha) private canchaRepository: Repository<Cancha>) {}

    async createTurno(turno: TurnoDto) {
        
        const userFinded = await this.userRepository.findOne({where:{id: turno.userId}, relations: ["turnos", "sedes"]});

        if (!userFinded) {
            return new NotFoundException('Usuario no encontrado')
        }

        const canchaFinded = await this.canchaRepository.findOne({where:{id: turno.canchaId}, relations: ["turnos", "sede"]});

        for (let index = 0; index < canchaFinded.turnos.length; index++) {
            if(canchaFinded.turnos[index].date === turno.date) {
                if(canchaFinded.turnos[index].time === turno.time) {
                    return new NotFoundException('Para el dia y horario seleccionado la cancha se encuentra ocupada')
                }
            }
        }

        const newTurno = new Turno()
        newTurno.date = turno.date
        newTurno.time = turno.time
        newTurno.cancha = canchaFinded
        newTurno.user = userFinded
    
        await this.turnoRepository.save(newTurno);
    
        return "El turno fue creado con éxito";

    }

    async cancelTurno(id: string) {

        const turnoFinded = await this.turnoRepository.findOne({where:{id: id}, relations: ["cancha", "user"]})

        if(!turnoFinded) return new NotFoundException("El turno que desea cancelar no existe")

        turnoFinded.status = Status.Cancelado
        await this.turnoRepository.save(turnoFinded)

        return (`El turno con id: ${turnoFinded.id} ha sido cancelado con éxito.`)
    }

    async getTurnoById(id: string) {

        const turnoFinded = await this.turnoRepository.findOne({where:{id: id}, relations: ["cancha", "user"]})

        if(!turnoFinded) return new NotFoundException(`El turno no existe para el ID: ${id}`)

        return turnoFinded
    }
}