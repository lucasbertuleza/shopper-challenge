import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationFailed } from './modules/app/validation-failed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, exceptionFactory: ValidationFailed }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
