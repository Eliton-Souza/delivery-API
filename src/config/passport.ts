import passport from "passport";
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario";

dotenv.config();

export interface dadosUsuario{
    id_usuario: number;
    id_funcionario: number | null;
    nome: string;
    sobrenome: string;
    avatar: string;
    exp: number;
};

const options= {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}


const jwtStrategy = new JWTStrategy(options, async (payload: dadosUsuario, done) => {
    const tokenExp = payload.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const usuario= await Usuario.findByPk(payload.id_usuario);

    if (tokenExp < currentTimestamp || !usuario) {
        // O token está expirado ou usuario nao encontrado
        return done(null, false);
    }

        // Token válido, passa as informações do usuário decodificadas para a função done
        return done(null, payload);
    });

passport.use(jwtStrategy);

export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate('jwt', { session: false }, (error: Error, user: dadosUsuario) => {
    if (error || !user) {
        // O token é inválido ou expirou
        return res.json({ error: 'Acesso inválido ou expirado' });
    }

    req.user = user;

    next();
    })(req, res, next);
};

export const gerarToken= (dados: dadosUsuario) => {
    return jwt.sign(dados, process.env.JWT_SECRET as string);
}


export const gerarPayload = (id_usuario: number, id_funcionario: number | null, nome: string, sobrenome: string, urlAvatar: string) => {

    const payload: dadosUsuario = {
      id_usuario: id_usuario,
      id_funcionario: id_funcionario,
      nome: nome,
      sobrenome: sobrenome,
      avatar: urlAvatar,
      exp: Math.floor(Date.now() / 1000) + (3600 * 24 * 7) // Definindo a expiração para 7 dias a partir do momento atual
    };

    return payload;
};