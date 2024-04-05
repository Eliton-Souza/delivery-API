import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Usuario } from './Usuario';
import { Bairro } from './Bairro';

//Endereco
export interface EnderecoInstance extends Model{
    id_endereco: number;
    id_usuario: number;
    estado: string;
    cidade: string;
    id_bairro: number;
    rua: string;
    numero: string;
    referencia: string;
    descricao: string;
    coordenadas: string;
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
    id_bairro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Bairro,
            key: 'id_bairro'
        }
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
    coordenadas: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'Endereco',
    timestamps: false
});

Usuario.hasMany(Endereco, { foreignKey: 'id_usuario' });
Endereco.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Bairro.hasMany(Endereco, { foreignKey: 'id_bairro' });
Endereco.belongsTo(Bairro, { foreignKey: 'id_bairro' });