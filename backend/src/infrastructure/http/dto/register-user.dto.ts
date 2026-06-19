import {
  IsString,
  IsEmail,
  IsIn,
  IsOptional,
  MaxLength,
  MinLength,
  Matches,
  Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IsCPFConstraint } from '../validators/is-cpf.validator.js';
import { ColorEnum } from '@core/value-objects';
import { RegisterUserInput } from '@core/application/dto';

const VALID_COLORS = Object.values(ColorEnum);

export class RegisterUserDto implements RegisterUserInput {
  @IsString()
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'Nome deve ter no máximo 255 caracteres' })
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, { message: 'Nome contém caracteres inválidos' })
  fullName!: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value.replace(/\D/g, ''))
  @MinLength(11, { message: 'CPF deve ter 11 dígitos' })
  @MaxLength(11, { message: 'CPF deve ter 11 dígitos' })
  @Validate(IsCPFConstraint)
  cpf!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @Transform(({ value }: { value: string }) => (value as string).toLowerCase())
  email!: string;

  @IsString()
  @IsIn(VALID_COLORS, {
    message: `Cor inválida. Cores disponíveis: ${VALID_COLORS.join(', ')}`,
  })
  @Transform(({ value }: { value: string }) => (value as string).toLowerCase())
  color!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Observações deve ter no máximo 1000 caracteres' })
  observation?: string | null;
}
