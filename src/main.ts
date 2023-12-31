import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder() 
    .setTitle('Prendas REST API')
    .setDescription('API REST para Prendas de Camilacharry')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options); 

  SwaggerModule.setup('docs', app, document); 
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
