import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Loja } from './Loja';
import { Categoria } from './Categoria';

export interface ProdutoInstance extends Model {
    id_produto: number;
    id_loja: number;
    id_categoria: number;
    nome: string;    
    tipo: string;               //pizza, preparado ou industrializado
    imagem: string;
    descricao: string;
    status: boolean;             //ativado, desativado
    preco: number;              //deletar
    categoria: string;          //deletar
}


export const Produto= sequelize.define<ProdutoInstance>('Produto', {
    id_produto: {
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
    preco: {                    //deletar
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoria: {                //deletar
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    tableName: 'Produto',
    timestamps: false
});

Loja.hasMany(Produto, { foreignKey: 'id_loja' });
Produto.belongsTo(Loja, { foreignKey: 'id_loja' });

Categoria.hasMany(Produto, { foreignKey: 'id_categoria' });
Produto.belongsTo(Categoria, { foreignKey: 'id_categoria' });