import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Enable validation globally
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const firstError = errors
          .map((error) => Object.values(error.constraints))
          .flat()[0];
        const transformedError = firstError.replace(/_/g, ' ');
        return new HttpException(
          {
            status_code: HttpStatus.BAD_REQUEST,
            message: `Validation failed. ${transformedError}`,
            errors: errors
              .map((error) => Object.values(error.constraints))
              .flat(),
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  // app.setGlobalPrefix('api/v1');
  // app.useGlobalFilters(new ValidationExceptionFilter());
  await app.listen(3001);
}
bootstrap();
