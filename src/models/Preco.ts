import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Complemento } from './Complemento';
import { Produto } from './Produto';

export interface PrecoInstance extends Model {
    id_preco: number;
    id_produto: number;             
    id_complemento: number;
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
    id_complemento: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Complemento,
            key: 'id_complemento'
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

Complemento.hasMany(Preco, { foreignKey: 'id_complemento' });
Preco.belongsTo(Complemento, { foreignKey: 'id_complemento' });