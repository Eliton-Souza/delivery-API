import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Loja } from './Loja';

export interface GrupoInstance extends Model {
    id_grupo: number;
    id_loja: number;
    nome: string;       //ex: pizzas tradicionais, pizzas doces, bordas, adicionais..
    tipo: string;       //ex: borda, coleção de sabores, adicionais
}

export const Grupo= sequelize.define<GrupoInstance>('Grupo', {
    id_grupo: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_loja: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Loja,
            key: 'id_loja'
        }
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

Loja.hasMany(Grupo, { foreignKey: 'id_loja' });
Grupo.belongsTo(Loja, { foreignKey: 'id_loja' });