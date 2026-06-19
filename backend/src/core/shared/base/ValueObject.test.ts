import { describe, it, expect } from 'vitest';
import { ValueObject } from './ValueObject.js';

interface TestProps {
  name: string;
  value: number;
}

class TestValueObject extends ValueObject<TestProps> {
  get name() { return this.props.name; }
  get value() { return this.props.value; }
}

describe('ValueObject', () => {
  it('cria com props fornecidas', () => {
    const vo = new TestValueObject({ name: 'test', value: 42 });
    expect(vo.name).toBe('test');
    expect(vo.value).toBe(42);
  });

  it('retorna true para props iguais', () => {
    const a = new TestValueObject({ name: 'test', value: 42 });
    const b = new TestValueObject({ name: 'test', value: 42 });
    expect(a.equals(b)).toBe(true);
  });

  it('retorna false para props diferentes', () => {
    const a = new TestValueObject({ name: 'test', value: 42 });
    const b = new TestValueObject({ name: 'other', value: 42 });
    expect(a.equals(b)).toBe(false);
  });

  it('retorna false para null', () => {
    const vo = new TestValueObject({ name: 'test', value: 42 });
    expect(vo.equals(null as unknown as TestValueObject)).toBe(false);
  });

  it('retorna false para undefined', () => {
    const vo = new TestValueObject({ name: 'test', value: 42 });
    expect(vo.equals(undefined as unknown as TestValueObject)).toBe(false);
  });

  it('retorna true para mesma instância', () => {
    const vo = new TestValueObject({ name: 'test', value: 42 });
    expect(vo.equals(vo)).toBe(true);
  });
});
