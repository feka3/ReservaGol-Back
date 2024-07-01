import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { auth } from 'express-openid-connect';
import {config as auth0Config} from './config/auth0.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config))
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
      'Esta es la API construida con NestJS para el Proyecto Final de Henry.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
