import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './global-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionsFilter())
  await app.listen(process.env.PORT ?? 9999);
}
bootstrap();
