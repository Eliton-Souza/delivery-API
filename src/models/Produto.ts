import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Categoria } from './Categoria';

export interface ProdutoInstance extends Model {
    id_produto: number;
    id_categoria: number;
    nome: string;    
    tipo: string;               //pizza, outros...
    preco: number;
    imagem: string;
    descricao: string;
    status: boolean;             //1-ativado, 2-desativado
}


export const Produto= sequelize.define<ProdutoInstance>('Produto', {
    id_produto: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id_categoria'
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
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
    tableName: 'Produto',
    timestamps: false
});

Categoria.hasMany(Produto, { foreignKey: 'id_categoria' });
Produto.belongsTo(Categoria, { foreignKey: 'id_categoria' });