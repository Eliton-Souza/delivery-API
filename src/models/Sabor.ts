import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Grupo } from './Grupo';

export interface SaborInstance extends Model {
    id_sabor: number;
    id_grupo: number;
    nome: string;    
    imagem: string;
    descricao: string;      //Sabores de pizza como: 4queijos, moda... adicionais gerais como: bacon, queijo
    status: boolean;         //ativado, desativado.
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