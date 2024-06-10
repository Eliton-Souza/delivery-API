import { Router } from 'express';
import * as UsuarioController from '../controllers/usuarioController';
import * as FuncionarioController from '../controllers/funcionarioController';
import * as LoginController from '../controllers/loginController';
import * as LojaController from '../controllers/lojaController';
import * as CategoriaController from '../controllers/categoriaController';
import * as GrupoController from '../controllers/grupoController';
import * as ComplementoController from '../controllers/complementoController';
import * as VerificacaoController from '../controllers/verificacaoController';
import * as FileController from '../controllers/fileController';
import * as ProdutoController from '../controllers/produtoController';
import * as EnderecoController from '../controllers/enderecoController';
import * as BairroController from '../controllers/bairroController';
import * as TaxasController from '../controllers/taxasController';
import { uploadFile } from '../middlewares/multerConfig';

import * as valida from '../middlewares/validaSchema';

import { verificarTokenUsuario } from '../config/passportUsuario';
import { verificarTokenFuncionario } from '../config/passportFuncionario';

const router = Router();


//CLIENTES------->

//Endereco
router.post('/endereco', verificarTokenUsuario, EnderecoController.cadastrarEndereco);
router.get('/endereco', verificarTokenUsuario, EnderecoController.listarEnderecos);
router.put('/endereco/:id_endereco', verificarTokenUsuario, EnderecoController.editarEndereco);
router.delete('/endereco/:id_endereco', verificarTokenUsuario, EnderecoController.deletarEndereco);

//Dados das lojas
router.get('/loja/:nome_loja', LojaController.pegarLoja);
router.get('/lojas', LojaController.listarLojas);










//LOJAS------->

//Funcionario
router.post('/funcionario', verificarTokenFuncionario, FuncionarioController.cadastrarFuncionario);

//Dados basicos de uma loja
router.get('/loja', verificarTokenFuncionario, LojaController.pegarLojaFuncionario);
router.put('/loja/imagem', verificarTokenFuncionario, LojaController.atualizarImagemPerfilLoja);
router.put('/loja/detalhes', verificarTokenFuncionario, LojaController.atualizarNomeContato);
router.put('/loja/horarios', verificarTokenFuncionario, LojaController.editarHorarios);

//Categoria
router.post('/categoria', verificarTokenFuncionario, CategoriaController.cadastrarCategoria);
router.put('/prioridadeCategoria', verificarTokenFuncionario, CategoriaController.editarPrioridadeCategoria);
router.get('/categoria', verificarTokenFuncionario, CategoriaController.listarCategorias);

//Produto
router.post('/produto', verificarTokenFuncionario, ProdutoController.cadastrarProduto);

//Grupo
router.post('/grupo', verificarTokenFuncionario, GrupoController.criarGrupos);
router.get('/grupo', verificarTokenFuncionario, GrupoController.pegarGrupos);
router.put('/grupo', verificarTokenFuncionario, GrupoController.editarGrupo);

//Complemento
router.post('/complemento', verificarTokenFuncionario, ComplementoController.criarComplemento);
router.get('/complemento/:id_grupo', verificarTokenFuncionario, ComplementoController.pegarComplementos);
//router.put('/grupo', verificarToken, GrupoController.editarGrupo);

//Taxas de Entrega
router.get('/taxas', verificarTokenFuncionario, TaxasController.pegarTaxas);
router.put('/taxas', verificarTokenFuncionario, TaxasController.editarTaxas);










//GERAL------->

//Validacao
router.post('/usuario', UsuarioController.cadastrarUsuario);
router.post('/login', LoginController.login);
router.post('/celular', VerificacaoController.validaCelular);
router.post('/codigo', VerificacaoController.validaCodigo);

//Arquivos
router.post('/upload-file', uploadFile.single('file'), FileController.uploadImagem);
router.get('/imagem/:link', FileController.pegarImagem);

//Bairro
router.get('/bairro/:cidade', BairroController.listarBairros);
router.get('/lojas', LojaController.listarLojas);










//PRIVADO------->
router.post('/loja', LojaController.cadastrarLoja);
router.post('/bairro', BairroController.cadastrarBairro);




/*
//CRUD ALUNO
router.post('/aluno', verificarToken, valida.aluno, AlunoController.criarAluno);
router.get('/alunos', verificarToken ,AlunoController.listarAlunos);
router.get('/ranking', verificarToken ,AlunoController.rankingAlunos);
router.get('/aluno/:id',verificarToken, AlunoController.pegarAluno);
router.put('/aluno/:id', verificarToken, valida.updateAluno, AlunoController.atualizarAluno);
router.delete('/aluno/:id',verificarToken, AlunoController.deletarAluno);

*/

//usado na validação do token no frontend
router.get('/rotaProtegida', verificarTokenFuncionario, (req, res) => {
  // Lógica específica da rota protegida
  res.status(200).json({ message: 'Rota protegida acessada com sucesso' });
});

export default router;