import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

//Bairro
export interface BairroInstance extends Model{
    id_bairro: number;
    nome: string;
    cidade: string;
}

export const Bairro= sequelize.define<BairroInstance>('Bairro', {
    id_bairro: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Bairro',
    timestamps: false
});
