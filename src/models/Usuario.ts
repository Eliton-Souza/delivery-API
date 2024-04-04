import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Login } from './Login';

//Usuario
export interface UsuarioInstance extends Model{
    id_usuario: number;
    nome: string;
    sobrenome: string;
    genero: string;
    nascimento: Date;
    id_login: number;
    avatar: string;
}

export const Usuario= sequelize.define<UsuarioInstance>('Usuario', {
    id_usuario: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sobrenome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.ENUM('masculino', 'feminino', 'oculto'),
        allowNull: false
    },
    nascimento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    id_login: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Login,
            key: 'id_login'
        }
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'Usuario',
    timestamps: false
});

Login.hasOne(Usuario, { foreignKey: 'id_login' });
Usuario.belongsTo(Login, { foreignKey: 'id_login' });