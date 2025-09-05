import { AbrigoAnimais } from './abrigo-animais.js';

describe('Testes de precaução no abrigo', () => {

  test('Não pode ter brinquedo repetido na lista da primeira pessoa', () => {
    const res = new AbrigoAnimais().encontraPessoas(
      'RATO,RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo'
    );

    expect(res.erro).toBe('Brinquedo inválido');
    expect(res.lista).toBeFalsy();
  });

  test('Não pode repetir animal na ordem', () => {
    const res = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo,Rex'
    );

    expect(res.erro).toBe('Animal inválido');
    expect(res.lista).toBeFalsy();
  });

  test('Loco só vai pra alguém se tiver outro animal junto', () => {
    const semCompanhia = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'RATO,BOLA', 'Loco'
    );

    expect(semCompanhia.lista).toContain('Loco - abrigo');

    const comOutro = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'RATO,BOLA', 'Loco,Rex'
    );

    const locoAdotado = comOutro.lista.find(x => x.startsWith('Loco - pessoa'));
    expect(locoAdotado).toBeTruthy();
  });

});
