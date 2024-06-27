import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SedeModule } from './modules/sede/sede.module';
import { CanchaModule } from './modules/cancha/cancha.module';
import { TurnoModule } from './modules/turno/turno.module';
import { AuthModule } from './modules/auth/auth.module';
import typeOrmConfig from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederModule } from './common/precarga/seerder.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeOrmConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ConfigService.get("typeorm")
    }),
    UserModule, SedeModule, CanchaModule, TurnoModule, AuthModule, SeederModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET
    })],
  controllers: [],
  providers: [],
})
export class AppModule { }
