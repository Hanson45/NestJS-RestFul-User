import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false, // deshabilitar info de errores en validation
      transform: true, // tratará de transformar los tipos de aquellos parámetros u objetos JSON recibidos en el body.
      whitelist: true,
      forbidNonWhitelisted: true, // en post elimina propiedades adicionales que no estén definidas en el DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
