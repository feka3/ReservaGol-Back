import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MercadoPagoController } from './mercado-pago.controller';
import { MercadoPagoService } from './mercado-pago.service';
import { Turno } from '../turno/turno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService, EmailService],
})
export class MercadopagoModule {}
