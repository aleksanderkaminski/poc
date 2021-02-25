import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { createServer, proxy, Response } from 'aws-serverless-express';
import * as express from 'express';
import { Context } from 'aws-lambda';
import { Server } from 'http';
import { createApp } from './app';

let cachedServer: Server;

function setupSwagger(app, isServerless = true) {
  const serverUrl = isServerless ? '/dev' : '/';

  const config = new DocumentBuilder()
    .setTitle('Experiments Platform')
    .setDescription('Experiments API description')
    .setVersion('1.0')
    .addServer(serverUrl)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const expressApp = express();

  const app = await createApp(expressApp);
  setupSwagger(app);
  await app.init();

  return createServer(expressApp);
}

export async function handler(event: any, context: Context): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }
  if (event.path === '/api') {
    event.path = '/api/';
  }
  event.path = event.path.includes('swagger-ui')
    ? `/api${event.path}`
    : event.path;

  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
bootstrap();
