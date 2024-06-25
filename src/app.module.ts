import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SedeModule } from './sede/sede.module';
import { CanchaModule } from './cancha/cancha.module';
import { TurnoModule } from './turno/turno.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, SedeModule, CanchaModule, TurnoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
