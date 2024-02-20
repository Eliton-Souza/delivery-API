import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Sabor } from './Sabor';

export interface PrecoInstance extends Model {
    id_preco: number;
    id_sabor: number;
    tamanho: string;    
    preco: number; 
}


export const Preco= sequelize.define<PrecoInstance>('Preco', {
    id_preco: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_sabor: {
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

Sabor.hasMany(Preco, { foreignKey: 'id_sabor' });
Preco.belongsTo(Sabor, { foreignKey: 'id_sabor' });