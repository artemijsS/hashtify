import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/exception.filter';

async function bootstrap() {

  const PORT = process.env.PORT || 5000

  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT, () => console.log(`Api-gateway run on ${PORT} port`));
}
bootstrap();
