import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseUtils } from './core/utils/database.utils';

async function bootstrap() {
  const dbUtils = new DatabaseUtils();
  dbUtils.healthCheck();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT);

  console.log("-------> Aplicação rodando na porta " + process.env.APP_PORT);
  
  
  
}
bootstrap();
