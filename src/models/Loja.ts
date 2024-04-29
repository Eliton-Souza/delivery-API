import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface LojaInstance extends Model {
    id_loja: number;
    nome: string;
    entrega: string;    //tempo medio de entrega fornecido pela loja | 0= loja nao faz entrega
    bloqueado: boolean;  //pro administrador do sistema bloquear a loja por qualquer motivo
    contato: string;
    aberto: boolean;
    nota: number;
    tipo: string;   //restaurante, comercial, agropecuaria, açougue, farmacia
    logo: string;
    capa: string;
}


export const Loja= sequelize.define<LojaInstance>('Loja', {
    id_loja: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    entrega: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bloqueado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    contato: {
        type: DataTypes.STRING,
        allowNull: true
    },
    aberto: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    nota: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    capa: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'Loja',
    timestamps: false
});
