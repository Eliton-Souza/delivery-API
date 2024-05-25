import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface GrupoSaborInstance extends Model {
    id_grupo: number;
    nome: string;       //ex: pizzas tradicionais, pizzas doces, bordas..
    tipo: string;       //ex: borda, coleção de sabores
}

export const GrupoSabor= sequelize.define<GrupoSaborInstance>('GrupoSabor', {
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
    tableName: 'GrupoSabor',
    timestamps: false
});