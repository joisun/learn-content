import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as colors from 'colors';
import * as figlet from 'figlet';
async function bootstrap() {
  figlet(colors.green('beforealaaaaaaaa'), () => {});
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
