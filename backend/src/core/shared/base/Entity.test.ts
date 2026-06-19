import { describe, it, expect } from 'vitest';
import { Entity } from './Entity.js';

interface TestProps {
  name: string;
  value: number;
}

class TestEntity extends Entity<TestProps> {
  get name() { return this.props.name; }
  get value() { return this.props.value; }
}

describe('Entity', () => {
  it('cria com id gerado automaticamente', () => {
    const entity = new TestEntity({ name: 'test', value: 42 });
    expect(entity.id).toBeDefined();
    expect(typeof entity.id).toBe('string');
  });

  it('usa id fornecido', () => {
    const entity = new TestEntity({ name: 'test', value: 42 }, 'custom-id');
    expect(entity.id).toBe('custom-id');
  });

  it('retorna true para mesma instância em equals', () => {
    const entity = new TestEntity({ name: 'test', value: 42 });
    expect(entity.equals(entity)).toBe(true);
  });

  it('retorna true para mesmo id', () => {
    const a = new TestEntity({ name: 'a', value: 1 }, 'same-id');
    const b = new TestEntity({ name: 'b', value: 2 }, 'same-id');
    expect(a.equals(b)).toBe(true);
  });

  it('retorna false para ids diferentes', () => {
    const a = new TestEntity({ name: 'test', value: 42 }, 'id-1');
    const b = new TestEntity({ name: 'test', value: 42 }, 'id-2');
    expect(a.equals(b)).toBe(false);
  });

  it('retorna false para null', () => {
    const entity = new TestEntity({ name: 'test', value: 42 });
    expect(entity.equals(null as unknown as Entity<unknown>)).toBe(false);
  });

  it('retorna false para undefined', () => {
    const entity = new TestEntity({ name: 'test', value: 42 });
    expect(entity.equals(undefined as unknown as Entity<unknown>)).toBe(false);
  });
});
