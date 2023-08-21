import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './logger/exeption-filter';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { CustomLogger } from './logger/logger.service';
const PORT = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service OpenAPI 3.0')
    .setVersion('1.0')
    .addTag('album')
    .addTag('artist')
    .addTag('favorites')
    .addTag('track')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  const logger = app.get(CustomLogger);

  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggerInterceptor(logger));
  app.useGlobalFilters(new CustomExceptionFilter(logger));

  process.on('uncaughtException', (err, origin) => {
    logger.error(
      'Uncaught exception:',
      err.message,
      'origin:',
      origin,
      'error',
    );
    throw err;
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  await app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}
bootstrap();
