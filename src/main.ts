import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MiddlewareGlobal } from './common/middlewares/global.middleware';
import * as dotenv from 'dotenv';

dotenv.config();

  
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.use(MiddlewareGlobal)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Reserva Gol')
    .setDescription(
      'Esta es la API construida con NestJS para el Proyecto Final de Henry.\nUSUARIOS:\n\t- Si al momento de probar el registro da error por duplicación de mail, agregue algo aleatorio al comienzo manteniendo la estructura @example.com (ej: prueba1@example.com)\n\t- Se distinguen tres tipos de usuarios: \n\t\t- superadmin: Este rol permite asignar administradores.\n\t\t- admin: Este rol tiene permisos para crear sedes y canchas.\n\t\t- user: Este rol tiene permisos para reservar canchas.\nTURNOS:\n\t- Los turnos se encuentran previamente cargados en la base de datos para que se puedan ver como disponibles para reservar. Se tiene en cuenta en horario de apertura y clausura de la cancha en cuestion, y se generan de forma automatica con intervalos de 1h.\n\t- Se distinguen tres tipos de estados para un turno: \n\t\t- libre: El turno se escuentra disponible para reservar.\n\t\t- pendiente: El turno ya fue reservado, pero todavia no abonado.\n\t\t- ocupado: El turno ya fue reservado y abonado. ',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
