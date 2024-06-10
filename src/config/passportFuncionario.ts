import passport from "passport";
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import jwt from "jsonwebtoken";
import { Funcionario } from "../models/Funcionario";

dotenv.config();

export interface dadosFuncionario {
    id_funcionario: number;
    nome: string;
    sobrenome: string;
    avatar: string;
    exp: number;
};

const optionsFuncionario = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
};


const jwtStrategyFuncionario = new JWTStrategy(optionsFuncionario, async (payload: dadosFuncionario, done) => {
    const tokenExp = payload.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const funcionario = await Funcionario.findByPk(payload.id_funcionario);

    if (tokenExp < currentTimestamp || !funcionario) {
        return done(null, false);
    }

    return done(null, payload);
});

passport.use('jwt-funcionario', jwtStrategyFuncionario);

export const verificarTokenFuncionario = (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate('jwt-funcionario', { session: false }, (error: Error, user: dadosFuncionario) => {
        if (error || !user) {
            return res.status(401).json({ error: 'Acesso inválido ou expirado' });
        }

        req.funcionario = user;
        next();
    })(req, res, next);
};


export const gerarTokenFuncionario = (dados: dadosFuncionario) => {
    return jwt.sign(dados, process.env.JWT_SECRET as string);
};


export const gerarPayloadFuncionario = (id_funcionario: number, nome: string, sobrenome: string, urlAvatar: string) => {
    const payload: dadosFuncionario = {
        id_funcionario,
        nome,
        sobrenome,
        avatar: urlAvatar,
        exp: Math.floor(Date.now() / 1000) + (3600 * 24 * 7)
    };

    return payload;
};