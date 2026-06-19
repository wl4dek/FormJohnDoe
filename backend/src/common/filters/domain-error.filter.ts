import { Catch, type ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { DomainError } from '../../core/shared/errors/DomainError.js';

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();

    reply.status(HttpStatus.BAD_REQUEST).send({
      success: false,
      errors: [{ field: exception.field, message: exception.message }],
    });
  }
}
