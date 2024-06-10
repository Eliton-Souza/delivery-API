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
    avatar: string;
}

export const Usuario= sequelize.define<UsuarioInstance>('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        references: {
            model: Login,
            key: 'id_login'
        }
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
    
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'Usuario',
    timestamps: false
});

Login.hasOne(Usuario, { foreignKey: 'id_login' });
Usuario.belongsTo(Login, { foreignKey: 'id_usuario' });