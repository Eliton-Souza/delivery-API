import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Produto } from './Produto';

export interface SaborInstance extends Model {
    id_sabor: number;
    id_produto: number;
    nome: string;    
    imagem: string;
    status: string;     //ativo, suspenso, arquivado.
    categoria: string;
    descricao: string;
}


export const Sabor= sequelize.define<SaborInstance>('Sabor', {
    id_sabor: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    tableName: 'Sabor',
    timestamps: false
});

Produto.hasMany(Sabor, { foreignKey: 'id_produto' });
Sabor.belongsTo(Produto, { foreignKey: 'id_produto' });