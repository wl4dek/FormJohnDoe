import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { DrizzleModule } from './infrastructure/persistence/drizzle/drizzle.module.js';
import { DrizzleUserRepository } from './infrastructure/persistence/repositories/DrizzleUserRepository.js';

import type { IUserRepository } from './core/ports/IUserRepository.js';
import { RegisterUserUseCase } from './core/application/use-cases/RegisterUser.js';
import { UserController } from './infrastructure/http/controllers/UserController.js';
import { HealthController } from './infrastructure/http/controllers/HealthController.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';
import { BadRequestException, type ValidationError, type HttpException } from '@nestjs/common';

@Module({
  imports: [DrizzleModule],
  controllers: [UserController, HealthController],
  providers: [
    { provide: 'IUserRepository', useClass: DrizzleUserRepository },
    {
      provide: 'REGISTER_USER_USE_CASE',
      useFactory: (repo: IUserRepository) => new RegisterUserUseCase(repo),
      inject: ['IUserRepository'],
    },
    {
      provide: APP_FILTER,
      useClass: DomainErrorFilter,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
          exceptionFactory: formatValidationErrors,
        }),
    },
  ],
})
export class AppModule { }

export function formatValidationErrors(errors: ValidationError[]): HttpException {
  const formatted = errors.map(err => ({
    field: err.property,
    message: Object.values(err.constraints ?? {}).join(', '),
  }));
  return new BadRequestException({ success: false, errors: formatted });
}
