import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) {}


    async getUserById(userId: string): Promise<User> {

        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['sedes'],
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
        const newCanchero = await this.userRepository.create(canchero);
        await this.userRepository.save(newCanchero);
        return 'Usuario registrado con exito';
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
