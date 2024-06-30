import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UsersService {
    constructor(private readonly userRepo: UserRepository) { }

    /* async getJugadorId(id) {
        return this.userRepo.getJugadorId(id)
    } */
}