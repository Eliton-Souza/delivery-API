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
    bloqueado: string;  //pro administrador do sistema bloquear a loja por qualquer motivo
    aberto: string;
    nota: number;
}


export const Loja= sequelize.define<LojaInstance>('Loja', {
    id_usuario: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false
    },
    aberto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    tableName: 'Loja',
    timestamps: false
});
