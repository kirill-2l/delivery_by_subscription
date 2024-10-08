import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as process from "node:process";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("API")
    .setDescription("API description")
    .setVersion(process.env.API_VERSION)
    .addTag("api")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(process.env.APP_PORT);
}

bootstrap();
