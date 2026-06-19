import { ValueObject } from '../shared/base/ValueObject.js';
import { DomainError } from '../shared/errors/DomainError.js';

export enum ColorEnum {
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  GREEN = 'green',
  BLUE = 'blue',
  INDIGO = 'indigo',
  PURPLE = 'purple',
  PINK = 'pink',
  GRAY = 'gray',
  BLACK = 'black',
}

const VALID_COLORS = Object.values(ColorEnum);

interface ColorProps {
  value: ColorEnum;
}

export class Color extends ValueObject<ColorProps> {
  private constructor(props: ColorProps) {
    super(props);
  }

  static create(value: string): Color {
    const normalized = value.toLowerCase().trim();
    if (!VALID_COLORS.includes(normalized as ColorEnum)) {
      throw new DomainError(
        `Cor inválida: "${value}". Cores disponíveis: ${VALID_COLORS.join(', ')}`,
      );
    }
    return new Color({ value: normalized as ColorEnum });
  }

  get value(): ColorEnum {
    return this.props.value;
  }

  static get availableColors(): ColorEnum[] {
    return [...VALID_COLORS];
  }
}
