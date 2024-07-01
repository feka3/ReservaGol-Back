
import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
const { requiresAuth } = require('express-openid-connect');
import { Request } from 'express';


@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UsersService,
      ) {}

  
    @Get('auth0/protected')
    async getAuth0Protected(@Req() req: Request){
        //console.log(req.oidc.accessToken)
        return JSON.stringify(req.oidc.user)
    }

    @Get(":id")
    async getUserById(@Param("id") id: string) {
        return await this.userService.getUserById(id);
    }
    
    
}
