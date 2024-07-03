import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async getUsers(){
      return await this.userRepository.getUsers();
    }

    async getUserById(id: string) {
        return await this.userRepository.getUserById(id);
      }
}