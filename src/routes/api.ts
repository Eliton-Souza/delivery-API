import { Router } from 'express';
import * as UsuarioController from '../controllers/usuarioController';
import * as LoginController from '../controllers/loginController';
import * as LojaController from '../controllers/lojaController';
import * as VerificacaoController from '../controllers/verificacaoController';
import * as FileController from '../controllers/fileController';
import * as ProdutoController from '../controllers/produtoController';
import * as SaborController from '../controllers/saborController';
import * as EnderecoController from '../controllers/enderecoController';
import * as BairroController from '../controllers/bairroController';

import * as valida from '../middlewares/validaSchema';

import { verificarToken } from '../config/passport';
import { uploadFile } from '../middlewares/multerConfig';

const router = Router();

router.post('/login', LoginController.login);

//CODIGO VALIDAÇÃO
router.post('/celular', VerificacaoController.validaCelular);
router.post('/codigo', VerificacaoController.validaCodigo);

//CRUD USUARIO
router.post('/usuario', UsuarioController.cadastrarUsuario);
//router.get('/usuario/:id_loja', verificarToken, UsuarioController.listarFuncionarios);
//router.put('/usuario/:id_usuario', verificarToken, UsuarioController.atualizarFuncionário);

//CRUD ENDEREÇO
router.post('/endereco', verificarToken, EnderecoController.cadastrarEndereco);
router.get('/endereco', verificarToken, EnderecoController.listarEnderecos);
router.put('/endereco/:id_endereco', verificarToken, EnderecoController.editarEndereco);
router.delete('/endereco/:id_endereco', verificarToken, EnderecoController.deletarEndereco);


//PRODUTO
router.post('/produto', verificarToken, ProdutoController.cadastrarProduto);
router.get('/produtos/:id_loja', ProdutoController.listarProdutos);
//router.put('/produto/:id_produto', verificarToken, ProdutoController.atualizarProduto);

//SABORES
router.post('/sabor', verificarToken, SaborController.cadastrarSabor);
router.get('/sabores/:id_produto', SaborController.listarSabores);
//router.put('/produto/:id_produto', verificarToken, ProdutoController.atualizarProduto);


//CRUD LOJA CLIENTE
router.post('/loja', LojaController.cadastrarLoja);
router.get('/loja/:nome_loja', LojaController.pegarLoja);
router.get('/lojas', LojaController.listarLojas);

//CRUD LOJA FUNCIONARIO
router.get('/loja-funcionario', verificarToken, LojaController.pegarLojaFuncionario);
router.put('/loja/fotos', verificarToken, LojaController.atualizarFotosLoja);
//router.get('/lojas', LojaController.listarLojas);

//CRUD BAIRRO
router.post('/bairro', BairroController.cadastrarBairro);
router.get('/bairro/:cidade', BairroController.listarBairros);
router.get('/lojas', LojaController.listarLojas);


router.post('/upload-file', uploadFile.single('file'), FileController.uploadImagem);



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