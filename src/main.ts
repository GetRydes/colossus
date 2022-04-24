import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { resolve } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // Set the global root directory path
  global.appRoot = resolve(__dirname);

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Rydes Driver Service API')
    .setDescription('Documentation for the rydes driver micro service API')
    .setVersion('1.0')
    .addTag('ride-sharing')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
