import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CancheroDto } from '../auth/auth.dto';
import * as bcrypt from "bcrypt";


@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) { }


    async getUsers(){
        return this.userRepository.find({relations: ["sedes", "turnos"]})
    }

    async getUserById(userId: string): Promise<User> {

        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["sedes", "turnos"],
        });

        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return user;
    }


    async postUser(user: Partial<User>) {
        const newUser = await this.userRepository.save(user);
        const dbUser = await this.userRepository.findOneBy({ id: user.id });

        const { password, ...noPassword } = dbUser;

        return noPassword;
    }

    

    async signupCanchero(canchero) {
        const { password } = canchero;
        canchero.password = await bcrypt.hash(password, 10);

        const newCanchero = await this.userRepository.create(canchero);
        await this.userRepository.save(newCanchero);
        return newCanchero
    }

    async getUserEmail(email: string) {
        return await this.userRepository.findOne(
            {
                where: { email: email },
                relations: ['sedes'],
            }
        );
    }
}
