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

import * as valida from '../middlewares/validaSchema';

import { verificarToken } from '../config/passport';
import { uploadFile } from '../middlewares/multerConfig';

const router = Router();


//CLIENTES------->

//Endereco
router.post('/endereco', verificarToken, EnderecoController.cadastrarEndereco);
router.get('/endereco', verificarToken, EnderecoController.listarEnderecos);
router.put('/endereco/:id_endereco', verificarToken, EnderecoController.editarEndereco);
router.delete('/endereco/:id_endereco', verificarToken, EnderecoController.deletarEndereco);

//Dados das lojas
router.get('/loja/:nome_loja', LojaController.pegarLoja);
router.get('/lojas', LojaController.listarLojas);










//LOJAS------->

//Funcionario
router.post('/funcionario', verificarToken, FuncionarioController.cadastrarFuncionario);

//Dados basicos de uma loja
router.get('/loja', verificarToken, LojaController.pegarLojaFuncionario);
router.put('/loja/imagem', verificarToken, LojaController.atualizarImagemPerfilLoja);
router.put('/loja/detalhes', verificarToken, LojaController.atualizarNomeContato);
router.put('/loja/horarios', verificarToken, LojaController.editarHorarios);

//Categoria
router.post('/categoria', verificarToken, CategoriaController.cadastrarCategoria);
router.put('/prioridadeCategoria', verificarToken, CategoriaController.editarPrioridadeCategoria);
router.get('/categoria', verificarToken, CategoriaController.listarCategorias);

//Produto
router.post('/produto', verificarToken, ProdutoController.cadastrarProduto);

//Grupo
router.post('/grupo', verificarToken, GrupoController.criarGrupos);
router.get('/grupo', verificarToken, GrupoController.pegarGrupos);
router.put('/grupo', verificarToken, GrupoController.editarGrupo);

//Complemento
router.post('/complemento', verificarToken, ComplementoController.criarComplemento);
router.get('/complemento/:id_grupo', verificarToken, ComplementoController.pegarComplementos);
//router.put('/grupo', verificarToken, GrupoController.editarGrupo);

//Taxas de Entrega
router.get('/taxas', verificarToken, TaxasController.pegarTaxas);
router.put('/taxas', verificarToken, TaxasController.editarTaxas);










//GERAL------->

//Validacao
router.post('/usuario', UsuarioController.cadastrarUsuario);
router.post('/login', LoginController.login);
router.post('/celular', VerificacaoController.validaCelular);
router.post('/codigo', VerificacaoController.validaCodigo);

//Arquivos
router.post('/upload-file', verificarToken, uploadFile.single('file'), FileController.uploadImagem);
router.get('/imagem/:link', verificarToken, FileController.pegarImagem);

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
router.get('/rotaProtegida', verificarToken, (req, res) => {
  // Lógica específica da rota protegida
  res.status(200).json({ message: 'Rota protegida acessada com sucesso' });
});

export default router;