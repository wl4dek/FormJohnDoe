import { describe, it, expect } from 'vitest';
import { Color, ColorEnum } from './Color.js';
import { DomainError } from '../shared/errors/DomainError.js';

describe('Color', () => {
  describe('create', () => {
    it('cria cor válida', () => {
      const color = Color.create('blue');
      expect(color).toBeInstanceOf(Color);
      expect(color.value).toBe(ColorEnum.BLUE);
    });

    it('normaliza para minúsculo', () => {
      const color = Color.create('BLUE');
      expect(color.value).toBe(ColorEnum.BLUE);
    });

    it('remove espaços ao redor', () => {
      const color = Color.create('  green  ');
      expect(color.value).toBe(ColorEnum.GREEN);
    });

    it('cria todas as cores válidas', () => {
      for (const cor of Object.values(ColorEnum)) {
        const color = Color.create(cor);
        expect(color.value).toBe(cor);
      }
    });

    it('lança DomainError para cor inválida', () => {
      expect(() => Color.create('invalid')).toThrow(DomainError);
    });

    it('lança DomainError para cor vazia', () => {
      expect(() => Color.create('')).toThrow(DomainError);
    });

    it('lança DomainError com mensagem listando cores disponíveis', () => {
      try {
        Color.create('invalid');
      } catch (e) {
        expect(e).toBeInstanceOf(DomainError);
        expect((e as DomainError).message).toContain('blue');
      }
    });
  });

  describe('availableColors', () => {
    it('retorna todas as cores', () => {
      const cores = Color.availableColors;
      expect(cores).toContain(ColorEnum.BLUE);
      expect(cores).toContain(ColorEnum.RED);
      expect(cores).toHaveLength(Object.values(ColorEnum).length);
    });

    it('retorna uma cópia independente', () => {
      const cores = Color.availableColors;
      cores.length = 0;
      expect(Color.availableColors).not.toHaveLength(0);
    });
  });
});
