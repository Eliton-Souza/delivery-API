import passport from "passport";
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario";

dotenv.config();

export interface dadosUsuario {
    id_usuario: number;
    nome: string;
    sobrenome: string;
    avatar: string;
    exp: number;
};


const optionsUsuario = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
};


const jwtStrategyUsuario = new JWTStrategy(optionsUsuario, async (payload: dadosUsuario, done) => {
    const tokenExp = payload.exp;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const usuario = await Usuario.findByPk(payload.id_usuario);

    if (tokenExp < currentTimestamp || !usuario) {
        return done(null, false);
    }

    return done(null, payload);
});



passport.use('jwt-usuario', jwtStrategyUsuario);


export const verificarTokenUsuario = (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate('jwt-usuario', { session: false }, (error: Error, user: dadosUsuario) => {
        if (error || !user) {
            return res.status(401).json({ error: 'Acesso inválido ou expirado' });
        }

        req.usuario = user;
        next();
    })(req, res, next);
};



export const gerarTokenUsuario = (dados: dadosUsuario) => {
    return jwt.sign(dados, process.env.JWT_SECRET as string);
};


export const gerarPayloadUsuario = (id_usuario: number, nome: string, sobrenome: string, urlAvatar: string) => {
    const payload: dadosUsuario = {
        id_usuario,
        nome,
        sobrenome,
        avatar: urlAvatar,
        exp: Math.floor(Date.now() / 1000) + (3600 * 24 * 7)
    };

    return payload;
};