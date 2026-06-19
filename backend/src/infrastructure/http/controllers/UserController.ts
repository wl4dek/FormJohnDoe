import { Controller, Post, Body, Inject } from '@nestjs/common';
import type { RegisterUserUseCase } from '../../../core/application/use-cases';
import { RegisterUserDto } from '../dto/register-user.dto.js';

@Controller('api')
export class UserController {
  constructor(
    @Inject('REGISTER_USER_USE_CASE')
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) { }

  @Post('users')
  async register(@Body() dto: RegisterUserDto) {
    return await this.registerUserUseCase.execute(dto);
  }
}
