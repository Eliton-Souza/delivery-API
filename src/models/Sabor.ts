import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Grupo } from './Grupo';

export interface SaborInstance extends Model {
    id_sabor: number;
    id_grupo: number;
    nome: string;    
    imagem: string;
    descricao: string;          //ingredientes dos sabores como: queijo, calabresa...
    status: boolean;            //1-ativado, 2-desativado
}

export const Sabor= sequelize.define<SaborInstance>('Sabor', {
    id_sabor: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_grupo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Grupo,
            key: 'id_grupo'
        }
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
    tableName: 'Sabor',
    timestamps: false
});

Grupo.hasMany(Sabor, { foreignKey: 'id_grupo' });
Sabor.belongsTo(Grupo, { foreignKey: 'id_grupo' });