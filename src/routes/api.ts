import { Router } from 'express';
import * as UsuarioController from '../controllers/usuarioController';
import * as LojaController from '../controllers/lojaController';
import * as VerificacaoController from '../controllers/verificacaoController';

import * as valida from '../middlewares/validaSchema';

import { verificarToken } from '../config/passport';

const router = Router();

//CODIGO VALIDAÇÃO
router.post('/numero', VerificacaoController.validaNumero);
router.post('/codigo', VerificacaoController.validaCodigo);

//CRUD USUARIO
router.post('/usuario', verificarToken, UsuarioController.cadastrarUsuario);
router.get('/usuario/:id_loja', verificarToken, UsuarioController.listarFuncionarios);
router.put('/usuario/:id_usuario', verificarToken, UsuarioController.atualizarFuncionário);

//CRUD LOJA
router.post('/loja', LojaController.cadastrarLoja);



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