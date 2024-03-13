import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Usuario } from './Usuario';

//Endereco
export interface EnderecoInstance extends Model{
    id_endereco: number;
    id_usuario: number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    referencia: string;
    descricao: string;
    status: string;
}

export const Endereco= sequelize.define<EnderecoInstance>('Endereco', {
    id_endereco: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false
    },   
    numero: {
        type: DataTypes.STRING,
        allowNull: true
    },
    referencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Endereco',
    timestamps: false
});

Usuario.hasMany(Endereco, { foreignKey: 'id_usuario' });
Endereco.belongsTo(Usuario, { foreignKey: 'id_usuario' });