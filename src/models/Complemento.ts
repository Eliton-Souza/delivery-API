import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Grupo } from './Grupo';

export interface ComplementoInstance extends Model {
    id_complemento: number;
    id_grupo: number;
    nome: string;           //bacon, ovos, queijo
    imagem: string;
    descricao: string;      // 50g bacon, 1 ovo frito...
    status: boolean;         //ativado, desativado.
    preco: number; 
}

export const Complemento= sequelize.define<ComplementoInstance>('Complemento', {
    id_complemento: {
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
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    tableName: 'Complemento',
    timestamps: false
});

Grupo.hasMany(Complemento, { foreignKey: 'id_grupo' });
Complemento.belongsTo(Grupo, { foreignKey: 'id_grupo' });