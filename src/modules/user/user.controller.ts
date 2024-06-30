
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UsersService,
      ) {}


    @Get(":id")
    async getUserById(@Param("id") id: string) {
        return await this.userService.getUserById(id);
    }
    
    
}
