import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Login } from './Login';
import { Loja } from './Loja';

//Usuario
export interface UsuarioInstance extends Model{
    id_usuario: number;
    nome: string;
    sobrenome: string;
    genero: string;
    nascimento: Date;
    id_login: number;
    tipo: string;
    id_loja: number | null;
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
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['cliente', 'gerente', 'funcionario', 'entregador']],
                msg: 'O tipo deve ser cliente, gerente, funcionario ou entregador.'
            }
        }
    },
    id_loja: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Loja,
            key: 'id_loja'
        },
        validate: {
            lojaRequired() {
                if (this.tipo === 'cliente' && this.id_loja !== null) {
                    throw new Error('Para clientes, o campo id_loja deve ser nulo.');
                }
                if (this.tipo !== 'cliente' && this.id_loja === null) {
                    throw new Error('Para cargos da loja, o campo id_loja é obrigatório.');
                }
            }
        },
        
    },
}, {
    tableName: 'Usuario',
    timestamps: false
});

Login.hasOne(Usuario, { foreignKey: 'id_login' });
Usuario.belongsTo(Login, { foreignKey: 'id_login' });

Loja.hasMany(Usuario, { foreignKey: 'id_loja' });
Usuario.belongsTo(Loja, { foreignKey: 'id_loja' });