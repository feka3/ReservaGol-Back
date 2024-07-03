import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MercadoPagoController } from './mercado-pago.controller';
import { MercadoPagoService } from './mercado-pago.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
})
export class AppModule {}
