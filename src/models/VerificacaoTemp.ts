import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

//Verificacao Temporaria
export interface VerificacaoTempInstance extends Model{
    id: number;
    celular: string;
    codigo: string;
    validado: boolean;
    expiracao: Date;
}

export const VerificacaoTemp= sequelize.define<VerificacaoTempInstance>('VerificacaoTemp', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    celular: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    validado: {
        type: DataTypes.BOOLEAN,
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
