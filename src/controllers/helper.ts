export const cadastrarUsuario = (error: any ) => {

    if (error.name === 'SequelizeUniqueConstraintError') {
      const str = error.errors[0].value;
      const novaStr = str.replace(/-/g, ' ');
    
      return ({ error: novaStr + ' já está cadastrado(a) no sistema' });
    }



    return ({error: error});
  
};
