import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { GrupoSabor } from './GrupoSabor';

export interface SaborInstance extends Model {
    id_sabor: number;
    id_grupo: number;
    nome: string;    
    imagem: string;
    descricao: string;      //queijo, bacon, tomate...
    status: string;         //ativado, desativado.
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
            model: GrupoSabor,
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
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Sabor',
    timestamps: false
});

GrupoSabor.hasMany(Sabor, { foreignKey: 'id_grupo' });
Sabor.belongsTo(GrupoSabor, { foreignKey: 'id_grupo' });