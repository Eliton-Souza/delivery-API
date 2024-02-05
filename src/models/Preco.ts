import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Produto } from './Produto';

export interface PrecoInstance extends Model {
    id_preco: number;
    id_produto: number;
    tamanho: string;    
    preco: number; 
}


export const Preco= sequelize.define<PrecoInstance>('Loja', {
    id_preco: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tamanho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    tableName: 'Preco',
    timestamps: false
});

Produto.hasMany(Preco, { foreignKey: 'id_produto' });
Preco.belongsTo(Produto, { foreignKey: 'id_produto' });