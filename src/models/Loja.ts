import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

// Interface do horário de funcionamento de um dia
interface HorarioFuncionamento {
    abertura: string; // (por exemplo, "09:00")
    fechamento: string; // (por exemplo, "18:00")
}

// Interface da estrutura do campo "funcionamento"
interface Funcionamento {
    domingo: HorarioFuncionamento;
    segunda: HorarioFuncionamento;
    terca: HorarioFuncionamento;
    quarta: HorarioFuncionamento;
    quinta: HorarioFuncionamento;
    sexta: HorarioFuncionamento;
    sabado: HorarioFuncionamento;
}

export interface LojaInstance extends Model {
    id_loja: number;
    nome: string;
    entrega: string;    //tempo medio de entrega fornecido pela loja | 0= loja nao faz entrega
    funcionamento: Funcionamento;   // Utilizando uma interface específica
    produtos: Record<string, any>;
    bloqueado: boolean;  //pro administrador do sistema bloquear a loja por qualquer motivo
    aberto: boolean;
    nota: number;
    tipo: string;   //restaurante, comercial, agropecuaria, açougue, farmacia
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
    funcionamento: {
        type: DataTypes.JSON,
        allowNull: false
    },
    produtos: {
        type: DataTypes.JSON,
        allowNull: false
    },
    bloqueado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
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
}, {
    tableName: 'Loja',
    timestamps: false
});
