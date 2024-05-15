import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

//Taxa de entrega de cada loja pra cada bairro
export interface TaxaEntregaInstance extends Model{
    id_taxa: number;
    id_bairro: number;
    id_loja: number;
    taxa: number;
}

export const TaxaEntrega= sequelize.define<TaxaEntregaInstance>('TaxaEntrega', {
    id_taxa: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_bairro: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_loja: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    taxa: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'TaxaEntrega',
    timestamps: false
});
