import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>) { }

        async postUser(user: User) {
            const newUser = await this.UserRepository.save(user)
            const dbUser = await this.UserRepository.findOneBy({ id: user.id })
    
            const { password, ...noPassword } = dbUser
    
    
            return noPassword
        }


        async getUserEmail(email: string) {
            return await this.UserRepository.findOneBy({ email: email });
    
        }
    }