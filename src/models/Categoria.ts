import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Loja } from './Loja';

export interface CategoriaInstance extends Model {
    id_categoria: number;           
    id_loja: number;            //id_loja + prioridade = unique
    nome: string;               //id_loja + nome = unique
    prioridade: number;         //1- Primeiro da tela; 2- Segundo da tela....
}


export const Categoria= sequelize.define<CategoriaInstance>('Categoria', {
    id_categoria: {
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
    prioridade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'Categoria',
    timestamps: false
});

Loja.hasMany(Categoria, { foreignKey: 'id_loja' });
Categoria.belongsTo(Loja, { foreignKey: 'id_loja' });