import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

//Login
export interface LoginInstance extends Model{
    id_login: number;
    email: string;
    celular: string;
    senha: string;
}

export const Login= sequelize.define<LoginInstance>('Login', {
    id_usuario: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            hasEmailOrCellular() {
                if (!this.email && !this.celular) {
                    throw new Error('Pelo menos o email ou o celular deve ser fornecido.');
                }
            }
        }
    },
    celular: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            hasEmailOrCellular() {
                if (!this.email && !this.celular) {
                    throw new Error('Pelo menos o email ou o celular deve ser fornecido.');
                }
            }
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Login',
    timestamps: false
});
