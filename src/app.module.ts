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
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { MercadopagoModule } from './modules/mercadopago/mercado-pago.module';
import { EmailModule } from './modules/email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TurnoGeneratorService } from './modules/turno/turnoGenerator.service';
import { ChatModule } from './modules/chat/chat.module';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, load: [typeOrmConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) =>
        ConfigService.get('typeorm'),
    }),

    UserModule,
    SedeModule,
    MercadopagoModule,
    CanchaModule,
    TurnoModule,
    AuthModule,
    SeederModule,
    CloudinaryModule,
    EmailModule,

    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),

    ChatModule,
  ],
  controllers: [],
  providers: [TurnoGeneratorService],
})
export class AppModule {}
