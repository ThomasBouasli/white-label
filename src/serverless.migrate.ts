import { NestFactory } from '@nestjs/core';

import { Handler } from 'aws-lambda';

import { AppModule } from '@/app/app.module';
import { exec } from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  return app;
}

export const handler: Handler = async () => {
  const promise = new Promise((resolve, reject) => {
    exec('yarn prisma db push', (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  })
    .then(() => {
      const promise = new Promise((resolve, reject) => {
        exec('yarn prisma db seed', (error, stdout, stderr) => {
          if (error) {
            return reject(error);
          }
          resolve(stdout ? stdout : stderr);
        });
      });

      return promise;
    })
    .catch((error) => {
      console.log(error);
    });

  return promise;
};

bootstrap();
