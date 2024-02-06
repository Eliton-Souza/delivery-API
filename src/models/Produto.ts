import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Loja } from './Loja';

export interface ProdutoInstance extends Model {
    id_produto: number;
    id_loja: number;
    nome: string;    
    avatar: string; 
    descricao: string;
    categoria: string;
    status: string;     //ativo, suspenso, arquivado.
}


export const Produto= sequelize.define<ProdutoInstance>('Produto', {
    id_produto: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_loja: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Produto',
    timestamps: false
});

Loja.hasMany(Produto, { foreignKey: 'id_loja' });
Produto.belongsTo(Loja, { foreignKey: 'id_loja' });