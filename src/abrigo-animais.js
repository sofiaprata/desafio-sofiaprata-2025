const ANIMAIS = {
  Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
  Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
  Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
  Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
  Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
  Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
  Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
};

const BRINQUEDOS_VALIDOS = new Set(['RATO', 'BOLA', 'NOVELO', 'LASER', 'CAIXA', 'SKATE']);

class AbrigoAnimais {
  encontraPessoas(brinquedos1, brinquedos2, ordemAnimais) {
    const pessoa1 = brinquedos1.split(',').map(b => b.trim());
    const pessoa2 = brinquedos2.split(',').map(b => b.trim());
    const ordem = ordemAnimais.split(',').map(a => a.trim());

    if (!this.validarBrinquedos(pessoa1) || !this.validarBrinquedos(pessoa2)) {
      return { erro: 'Brinquedo inválido' };
    }
    if (!this.validarAnimais(ordem)) {
      return { erro: 'Animal inválido' };
    }

    let adotadosPessoa1 = 0;
    let adotadosPessoa2 = 0;
    const resultados = [];
    const abrigoTemporario = new Set();

    for (const nomeAnimal of ordem) {
      const animal = ANIMAIS[nomeAnimal];
      if (!animal) continue;

      if (nomeAnimal === 'Loco') {
        resultados.push({ nome: nomeAnimal, status: 'abrigo' });
        abrigoTemporario.add(nomeAnimal);
        continue;
      }

      const podePessoa1 = this.temTodosBrinquedosNaOrdem(pessoa1, animal.brinquedos);
      const podePessoa2 = this.temTodosBrinquedosNaOrdem(pessoa2, animal.brinquedos);

      if (animal.tipo === 'gato' && podePessoa1 && podePessoa2) {
        resultados.push({ nome: nomeAnimal, status: 'abrigo' });
        abrigoTemporario.add(nomeAnimal);
        continue;
      }

      if (podePessoa1 && podePessoa2 && animal.tipo !== 'gato') {
        resultados.push({ nome: nomeAnimal, status: 'abrigo' });
        abrigoTemporario.add(nomeAnimal);
        continue;
      }

      if (podePessoa1 && adotadosPessoa1 < 3) {
        resultados.push({ nome: nomeAnimal, status: 'pessoa 1' });
        adotadosPessoa1++;
      } else if (podePessoa2 && adotadosPessoa2 < 3) {
        resultados.push({ nome: nomeAnimal, status: 'pessoa 2' });
        adotadosPessoa2++;
      } else {
        resultados.push({ nome: nomeAnimal, status: 'abrigo' });
        abrigoTemporario.add(nomeAnimal);
      }
    }

    if (abrigoTemporario.has('Loco')) {
      const idx = resultados.findIndex(r => r.nome === 'Loco');
      const companhia = ordem.filter(nome => nome !== 'Loco');

      if (companhia.length > 0) {
        if (this.temTodosBrinquedosNaOrdem(pessoa2, ANIMAIS['Loco'].brinquedos) && adotadosPessoa2 < 3) {
          resultados[idx].status = 'pessoa 2';
          adotadosPessoa2++;
          abrigoTemporario.delete('Loco');
        } else if (this.temTodosBrinquedosNaOrdem(pessoa1, ANIMAIS['Loco'].brinquedos) && adotadosPessoa1 < 3) {
          resultados[idx].status = 'pessoa 1';
          adotadosPessoa1++;
          abrigoTemporario.delete('Loco');
        }
      }
    }

    resultados.sort((a, b) => a.nome.localeCompare(b.nome));
    const lista = resultados.map(({ nome, status }) => `${nome} - ${status}`);

    return { lista, erro: false };
  }

  validarBrinquedos(lista) {
    const vistos = new Set();
    for (const brinquedo of lista) {
      if (!BRINQUEDOS_VALIDOS.has(brinquedo)) return false;
      if (vistos.has(brinquedo)) return false;
      vistos.add(brinquedo);
    }
    return true;
  }

  validarAnimais(lista) {
    const vistos = new Set();
    for (const nome of lista) {
      if (!ANIMAIS[nome]) return false;
      if (vistos.has(nome)) return false;
      vistos.add(nome);
    }
    return true;
  }

  temTodosBrinquedosNaOrdem(brinquedosPessoa, brinquedosAnimal) {
    let idxPessoa = 0;
    for (const bAnimal of brinquedosAnimal) {
      let achou = false;
      while (idxPessoa < brinquedosPessoa.length) {
        if (brinquedosPessoa[idxPessoa] === bAnimal) {
          achou = true;
          idxPessoa++;
          break;
        }
        idxPessoa++;
      }
      if (!achou) return false;
    }
    return true;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
