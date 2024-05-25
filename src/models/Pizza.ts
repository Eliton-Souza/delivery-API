import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Produto } from './Produto';

export interface PizzaInstance extends Model {
    id_pizza: number;       //usar o mesmo valor da chavePK Produtos, garantir one-to-one
    qtdSabores: number;
    qtdFatias: number;    
}

export const Pizza= sequelize.define<PizzaInstance>('Pizza', {
    id_pizza: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        references: {
            model: Produto,
            key: 'id_produto'
        }
    },
    qtdSabores: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qtdFatias: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'Pizza',
    timestamps: false
});

Produto.hasOne(Pizza, { foreignKey: 'id_produto' });
Pizza.belongsTo(Produto, { foreignKey: 'id_pizza' });