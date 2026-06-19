export class CPFValidator {
  static validar(cpf: string): boolean {
    const digitos = cpf.replace(/\D/g, '');

    if (digitos.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(digitos)) return false;

    const numeros = digitos.split('').map(Number);

    const calcularDigito = (base: number[]): number => {
      const soma = base.reduce((acc, num, index) => acc + num * (base.length + 1 - index), 0);
      const resto = (soma * 10) % 11;
      return resto === 10 ? 0 : resto;
    };

    const primeiroDV = calcularDigito(numeros.slice(0, 9));
    if (primeiroDV !== numeros[9]) return false;

    const segundoDV = calcularDigito(numeros.slice(0, 10));
    if (segundoDV !== numeros[10]) return false;

    return true;
  }
}
