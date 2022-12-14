import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from "body-parser"
import { AtGuard } from './common/guards';
import { Roles } from './common/guards/roles.guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.use(bodyParser.json({limit: '50mb'}))
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  const reflector = new Reflector()
  app.useGlobalGuards(new AtGuard(reflector), new Roles(reflector))
  await app.listen( process.env.PORT || 3001 );
}
bootstrap();
