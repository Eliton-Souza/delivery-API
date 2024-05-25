import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Sabor } from './Sabor';
import { Produto } from './Produto';

export interface PrecoInstance extends Model {
    id_preco: number;
    id_produto: number;             
    id_sabor: number;
    preco: number; 
}


export const Preco= sequelize.define<PrecoInstance>('Preco', {
    id_preco: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
}, {
    tableName: 'Preco',
    timestamps: false
});

//id_produto + id_sabor = unique

Produto.hasMany(Preco, { foreignKey: 'id_produto' });
Preco.belongsTo(Produto, { foreignKey: 'id_produto' });

Sabor.hasMany(Preco, { foreignKey: 'id_sabor' });
Preco.belongsTo(Sabor, { foreignKey: 'id_sabor' });