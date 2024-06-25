import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SedeModule } from './sede/sede.module';
import { CanchaModule } from './cancha/cancha.module';
import { TurnoModule } from './turno/turno.module';
import { AuthModule } from './auth/auth.module';
import typeOrmConfig from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, load: [typeOrmConfig]}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory:(ConfigService: ConfigService) => ConfigService.get("typeorm")}), 
    UserModule, SedeModule, CanchaModule, TurnoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
