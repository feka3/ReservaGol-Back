
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('Usuario')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService) {}


    @Get(":id")
    async getUserById(@Param("id") id: string) {
        return await this.userService.getUserById(id);
    }
    
   
}
