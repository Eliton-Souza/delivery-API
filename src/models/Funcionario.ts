import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Usuario } from './Usuario';
import { Loja } from './Loja';

//Endereco
export interface FuncionarioInstance extends Model{
    id_funcionario: number;
    id_loja: number;
    tipo: string;
}

export const Funcionario= sequelize.define<FuncionarioInstance>('Funcionario', {
    id_funcionario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },
    id_loja: {
        type: DataTypes.INTEGER,
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

Usuario.hasOne(Funcionario, { foreignKey: 'id_funcionario' });
Funcionario.belongsTo(Usuario, { foreignKey: 'id_funcionario' });

Loja.hasMany(Funcionario, { foreignKey: 'id_loja' });
Funcionario.belongsTo(Loja, { foreignKey: 'id_loja' });