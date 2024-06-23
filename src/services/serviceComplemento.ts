import { Complemento } from '../models/Complemento';
import { formataPreco, palavraPadronizado } from './helper';
import { pegaGrupo } from './serviceGrupo';

export const criarComplemento = async (id_grupo: number, nome: string, preco: number) => {

  try {
    const complemento= await Complemento.create({
      id_grupo,
      nome: palavraPadronizado(nome),
      preco: formataPreco(preco),
      status: 0,
    });

    return complemento;
    
  } catch (error: any) {
    throw error;
  }
}

export const pegarComplementos = async (id_grupo: string) => {
  try {
    const complementos = await Complemento.findAll({
      where: {
       id_grupo
      },
      raw: true
    });

    return complementos;
    
  } catch (error: any) {
    throw error;
  }
}

//pega um complemento
export const pegaComplemento = async (id_complemento: string) => {
  try {
    const complemento = await Complemento.findByPk(id_complemento, {raw:true});
    
    return complemento;
    
  } catch (error: any) {
    throw error;
  }
}

//edita um complemento
export const editarComplemento = async (id_loja: number, id_complemento: string, nome: string, preco: number, status: boolean) => {

  try {
    const complemento = await Complemento.findByPk(id_complemento);

    if (complemento) {
      const grupo= await pegaGrupo(complemento.id_grupo);

      if(grupo && grupo.id_loja == id_loja){
        complemento.nome= palavraPadronizado(nome) ?? complemento.nome;
        complemento.preco= formataPreco(preco) ?? complemento.preco;
        complemento.status= status;
        
        await complemento.save();
        return true;
      }
    }
      
    throw new Error('Erro ao editar complemento');
  
  } catch (error: any) {
    throw error;
  }
}


//deleta um complemento
export const deletarComplemento = async (id_complemento: string) => {
  
  try {  
    await Complemento.destroy({where:{id_complemento}});
    return true;
  } catch (error: any) {
    throw error;
  }
}