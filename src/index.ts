import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';
import passport from 'passport';
import { dadosUsuario } from './config/passportUsuario';
import { dadosFuncionario } from './config/passportFuncionario';

dotenv.config();

const server = express();

declare global {
    namespace Express {
        interface Request {
            funcionario: dadosFuncionario;
        }
    }
}

declare global {
    namespace Express {
        interface Request {
            usuario: dadosUsuario;
        }
    }
}


//configura quem pode acessar a api
server.use(cors({
    origin: '*'
}));

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(passport.initialize());

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    if(err.status){
        res.status(err.status);
    }else{
        res.status(400); // Bad Request
    }

    if(err.message){
        res.json({error: err.message})
    }else{
        res.json({ error: 'Ocorreu algum erro.' });
    }
}
server.use(errorHandler);

server.listen(process.env.PORT);