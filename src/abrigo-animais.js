const ANIMAIS = {
  Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
  Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
  Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
  Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
  Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
  Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
  Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
};

const BRINQUEDOS_VALIDOS = ['RATO', 'BOLA', 'NOVELO', 'LASER', 'CAIXA', 'SKATE'];

class AbrigoAnimais {
  encontraPessoas(brinq1, brinq2, ordemStr) {
    const pessoa1 = brinq1.split(',').map(x => x.trim());
    const pessoa2 = brinq2.split(',').map(x => x.trim());
    const ordem = ordemStr.split(',').map(x => x.trim());

    if (!this.validarBrinquedos(pessoa1) || !this.validarBrinquedos(pessoa2)) {
      return { erro: 'Brinquedo inválido' };
    }

    if (!this.validarAnimais(ordem)) {
      return { erro: 'Animal inválido' };
    }

    let adotados1 = 0;
    let adotados2 = 0;
    const resultado = [];

    for (let nome of ordem) {
      const animal = ANIMAIS[nome];

      if (nome === 'Loco') {
        resultado.push({ nome, status: 'abrigo' });
        continue;
      }

      const pode1 = this.temBrinquedos(pessoa1, animal.brinquedos);
      const pode2 = this.temBrinquedos(pessoa2, animal.brinquedos);

      if (animal.tipo === 'gato' && pode1 && pode2) {
        resultado.push({ nome, status: 'abrigo' });
      } else if (pode1 && pode2) {
        resultado.push({ nome, status: 'abrigo' });
      } else if (pode1 && adotados1 < 3) {
        resultado.push({ nome, status: 'pessoa 1' });
        adotados1++;
      } else if (pode2 && adotados2 < 3) {
        resultado.push({ nome, status: 'pessoa 2' });
        adotados2++;
      } else {
        resultado.push({ nome, status: 'abrigo' });
      }
    }

    const locoIndex = resultado.findIndex(x => x.nome === 'Loco');
    if (locoIndex !== -1 && ordem.length > 1) {
      const pode1 = this.temBrinquedos(pessoa1, ANIMAIS.Loco.brinquedos, true);
      const pode2 = this.temBrinquedos(pessoa2, ANIMAIS.Loco.brinquedos, true);

      if (pode2 && adotados2 < 3) {
        resultado[locoIndex].status = 'pessoa 2';
        adotados2++;
      } else if (pode1 && adotados1 < 3) {
        resultado[locoIndex].status = 'pessoa 1';
        adotados1++;
      }
    }

    resultado.sort((a, b) => a.nome.localeCompare(b.nome));
    const lista = resultado.map(x => `${x.nome} - ${x.status}`);

    return { lista, erro: false };
  }

  validarBrinquedos(lista) {
    const set = new Set();
    for (let b of lista) {
      if (!BRINQUEDOS_VALIDOS.includes(b) || set.has(b)) return false;
      set.add(b);
    }
    return true;
  }

  validarAnimais(lista) {
    const set = new Set();
    for (let nome of lista) {
      if (!ANIMAIS[nome] || set.has(nome)) return false;
      set.add(nome);
    }
    return true;
  }

  temBrinquedos(lista, brinquedosNecessarios, ignorarOrdem = false) {
    if (ignorarOrdem) {
      return brinquedosNecessarios.every(b => lista.includes(b));
    }

    let idx = 0;
    for (let b of brinquedosNecessarios) {
      let achou = false;
      while (idx < lista.length) {
        if (lista[idx] === b) {
          achou = true;
          idx++;
          break;
        }
        idx++;
      }
      if (!achou) return false;
    }
    return true;
  }
}

export { AbrigoAnimais as AbrigoAnimais };