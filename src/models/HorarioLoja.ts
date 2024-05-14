import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Loja } from './Loja';

export interface HorarioLojaInstance extends Model {
    id_horario: number;
    id_loja: number;
    diaSemana: string;    
    abertura1: string | null; 
    fechamento1: string | null;
    abertura2: string | null; 
    fechamento2: string | null;
}


export const HorarioLoja= sequelize.define<HorarioLojaInstance>('HorarioLoja', {
    id_horario: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_loja: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    diaSemana: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abertura1: {
        type: DataTypes.TIME,
        allowNull: true
    },
    fechamento1: {
        type: DataTypes.TIME,
        allowNull: true
    },
    abertura2: {
        type: DataTypes.TIME,
        allowNull: true
    },
    fechamento2: {
        type: DataTypes.TIME,
        allowNull: true
    },
}, {
    tableName: 'HorarioLoja',
    timestamps: false
});

Loja.hasMany(HorarioLoja, { foreignKey: 'id_loja' });
HorarioLoja.belongsTo(Loja, { foreignKey: 'id_loja' });