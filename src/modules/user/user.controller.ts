
import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

const { requiresAuth } = require('express-openid-connect');
import { Request } from 'express';


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
