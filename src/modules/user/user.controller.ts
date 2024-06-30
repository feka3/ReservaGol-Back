import { Controller, Get, HttpCode, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly serviceUser: UsersService){}

    
    /* @HttpCode(200)
    @Get(':id')
    //@UseGuards(AuthGuard)
    async getJugadorId(@Param('id', ParseUUIDPipe) id: string) {
        console.log(id)
        const user = await this.serviceUser.getJugadorId(id);
        return user;

    } */
}
