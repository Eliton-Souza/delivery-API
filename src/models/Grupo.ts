import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface GrupoInstance extends Model {
    id_grupo: number;
    nome: string;       //ex: pizzas tradicionais, pizzas doces, bordas, adicionais..
    tipo: string;       //ex: borda, coleção de sabores, adicionais
}

export const Grupo= sequelize.define<GrupoInstance>('Grupo', {
    id_grupo: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Grupo',
    timestamps: false
});