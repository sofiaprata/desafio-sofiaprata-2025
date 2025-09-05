import { AbrigoAnimais } from './abrigo-animais.js';


describe('Abrigo de Animais - Testes de Precaução', () => {
  
  test('Deve rejeitar brinquedos repetidos na lista da pessoa 1', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animais duplicados na ordem dos animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo,Rex'
    );
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Loco deve ir para pessoa 1 ou 2 somente se tiver companhia, senão fica no abrigo', () => {
    const resultado1 = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'RATO,BOLA', 'Loco'
    );
    expect(resultado1.lista).toContain('Loco - abrigo');

    const resultado2 = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'RATO,BOLA', 'Loco,Rex'
    );

    expect(
      resultado2.lista.some(item => item.startsWith('Loco - pessoa'))
    ).toBe(true);
  });

});
