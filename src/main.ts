import { ValidationPipe, UnprocessableEntityException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MiddlewareGlobal } from './common/middlewares/global.middleware';
import * as dotenv from 'dotenv';
import { IoAdapter } from '@nestjs/platform-socket.io';


dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
   

  app.use(MiddlewareGlobal);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((err) => {
          return {
            property: err.property,
            constraints: Object.values(err.constraints),
          };
        });
        return new UnprocessableEntityException(formattedErrors);
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Reserva Gol')
    .setDescription(
      'Esta es la API construida con NestJS para el Proyecto Final de Henry.\n\n' +
        '- **USUARIOS**:\n' +
        '\t- Si al momento de probar el registro da error por duplicación de mail, agregue algo aleatorio al comienzo manteniendo la estructura @example.com (ej: prueba1@example.com)\n' +
        '\t- Se distinguen tres tipos de usuarios:\n' +
        '\t\t- superadmin: Este rol permite asignar administradores.\n' +
        '\t\t- admin: Este rol tiene permisos para crear sedes y canchas.\n' +
        '\t\t- user: Este rol tiene permisos para reservar canchas.\n' +
        '- **TURNOS**:\n' +
        '\t- Los turnos se encuentran previamente cargados en la base de datos para que se puedan ver como disponibles para reservar. Se tiene en cuenta el horario de apertura y clausura de la cancha en cuestión, y se generan de forma automática con intervalos de 1h.\n' +
        '\t- Se distinguen tres tipos de estados para un turno:\n' +
        '\t\t- libre: El turno se encuentra disponible para reservar.\n' +
        '\t\t- pendiente: El turno ya fue reservado, pero todavía no abonado.\n' +
        '\t\t- ocupado: El turno ya fue reservado y abonado.\n' +
        '\n' +
        '**Contactos del Equipo**:\n' +
        '- **Arriola, Facundo** - [GitHub](https://github.com/feka3) | [LinkedIn](https://www.linkedin.com/in/facundo-arriola/)\n' +
        '- **Chang, Javier** - [GitHub](https://github.com/javi5456) | [LinkedIn](https://www.linkedin.com/in/javier-chang-09b187227/)\n' +
        '- **De la Cruz, Andrés** - [GitHub](https://github.com/AndresDelac) | [LinkedIn](https://www.linkedin.com/in/marcos-gómez-sebastian/)\n' +
        '- **De Miguel, Tomás** - [GitHub](https://github.com/Tomasdmiguel) | [LinkedIn](https://www.linkedin.com/in/tomas-de-miguel-2912342b5/)\n' +
        '- **Gentile, Romina** - [GitHub](https://github.com/romigentile) | [LinkedIn](https://www.linkedin.com/in/romigentile/)\n' +
        '- **Gomez, Marcos** - [GitHub](https://github.com/Marcos48149) | [LinkedIn](https://www.linkedin.com/in/marcos-gómez-sebastian/)\n' +
        '- **Meier, Pablo** - [GitHub](https://github.com/PabloSMeier) | [LinkedIn](https://www.linkedin.com/in/tomas-de-miguel-2912342b5/)\n',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}

bootstrap();
