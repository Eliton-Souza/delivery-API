import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Produto } from './Produto';

export interface ProdutoSimplesInstance extends Model {
    id_produtoSimples: number;
    preco: number; 
}

export const ProdutoSimples= sequelize.define<ProdutoSimplesInstance>('ProdutoSimples', {
    id_produtoSimples: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
        references: {
            model: Produto,
            key: 'id_produto'
        }
    },
    preco: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
}, {
    tableName: 'ProdutoSimples',
    timestamps: false
});


Produto.hasOne(ProdutoSimples, { foreignKey: 'id_produto' });
ProdutoSimples.belongsTo(Produto, { foreignKey: 'id_produtoSimples' });