import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/constants';
import { generateTypeormConfigFile } from './scripts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
  })
  )
  
  const config=app.get(ConfigService)
  const logger=new Logger();
  


  generateTypeormConfigFile(config)
  const port= config.get(PORT)
  await app.listen(port);

  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
