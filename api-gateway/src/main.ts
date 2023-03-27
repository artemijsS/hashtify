import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const PORT = process.env.PORT || 6000

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  await app.listen(PORT, () => console.log(`Api-gateway run on ${PORT} port`));
}
bootstrap();
