import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

//Verificacao Temporaria
export interface VerificacaoTempInstance extends Model{
    id: number;
    numero: string;
    codigo: string;
    expiracao: Date;
}

export const VerificacaoTemp= sequelize.define<VerificacaoTempInstance>('VerificacaoTemp', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    numero: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiracao: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'VerificacaoTemp',
    timestamps: false
});
