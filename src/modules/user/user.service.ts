import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async getUsers(){
      return await this.userRepository.getUsers();
    }

    async getUserById(id: string) {
        return await this.userRepository.getUserById(id);
    }

    async updateUserById(user: Partial<User> & { imgFile: string }, id:string) {
        return await this.userRepository.updateUserById(user, id);
    }


}