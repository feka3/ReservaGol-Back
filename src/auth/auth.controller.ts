import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly serviceAuth: AuthService,
    ) {}
     
    @Post('singin')
   async singIn(@Body() credential: any){

   
    }

    @HttpCode(201)
    @Post('singup')
    async signup( ){
     
        
    }
}