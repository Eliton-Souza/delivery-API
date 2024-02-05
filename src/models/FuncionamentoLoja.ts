import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Loja } from './Loja';

export interface FuncionamentoLojaInstance extends Model {
    id_funcionamento: number;
    id_loja: number;
    dia_semana: string;    
    abertura: string; 
    fechamento: string;
}


export const FuncionamentoLoja= sequelize.define<FuncionamentoLojaInstance>('Loja', {
    id_funcionamento: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_loja: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dia_semana: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abertura: {
        type: DataTypes.TIME,
        allowNull: false
    },
    fechamento: {
        type: DataTypes.TIME,
        allowNull: false
    },
}, {
    tableName: 'FuncionamentoLoja',
    timestamps: false
});

Loja.hasMany(FuncionamentoLoja, { foreignKey: 'id_loja' });
FuncionamentoLoja.belongsTo(Loja, { foreignKey: 'id_loja' });