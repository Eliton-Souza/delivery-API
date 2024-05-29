import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Produto } from './Produto';
import { Sabor } from './Sabor';

export interface PrecoInstance extends Model {
    id_preco: number;
    id_produto: number;             
    id_sabor: number;
    preco: number; 
    uniqueKey: string;
}

export const Preco= sequelize.define<PrecoInstance>('Preco', {
    id_preco: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Produto,
            key: 'id_produto'
        }
    },
    id_sabor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Sabor,
            key: 'id_sabor'
        }
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    uniqueKey: {                        //id_produto + id_complemento = unique
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Preco',
    timestamps: false
});


Produto.hasMany(Preco, { foreignKey: 'id_produto' });
Preco.belongsTo(Produto, { foreignKey: 'id_produto' });

Sabor.hasMany(Preco, { foreignKey: 'id_sabor' });
Preco.belongsTo(Sabor, { foreignKey: 'id_sabor' });