export const tratamentosErros = (error: any ) => {

    if (error.name === 'SequelizeUniqueConstraintError') {
      const str = error.errors[0].value;
      const novaStr = str.replace(/-/g, ' ');
    
      return ({ error: novaStr + ' já está cadastrado(a) no sistema' });
    }

    return ({error: error});  
};

export const formataNumero = (numero: string) => {
  // Remove o '9' da terceira posição
  const numeroSemNove = numero.slice(0, 2) + numero.slice(3);

  // Adiciona os 3 primeiros caracteres (+55)
  const numeroComCodigoPais = `+55${numeroSemNove}`;

  return numeroComCodigoPais;
}
