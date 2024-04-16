import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Usuario } from './Usuario';
import { Loja } from './Loja';

//Endereco
export interface FuncionarioInstance extends Model{
    id_funcionario: number;
    id_usuario: number;
    id_loja: number;
    tipo: string;
}

export const Funcionario= sequelize.define<FuncionarioInstance>('Funcionario', {
    id_funcionario: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },
    id_loja: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references: {
            model: Loja,
            key: 'id_loja'
        }
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Funcionario',
    timestamps: false
});

Usuario.hasOne(Funcionario, { foreignKey: 'id_usuario' });
Funcionario.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Loja.hasMany(Funcionario, { foreignKey: 'id_loja' });
Funcionario.belongsTo(Loja, { foreignKey: 'id_loja' });