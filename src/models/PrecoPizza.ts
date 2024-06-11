import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Sabor } from './Sabor';
import { Pizza } from './Pizza';

export interface PrecoPizzaInstance extends Model {
    id_precoPizza: number;
    id_pizza: number;             
    id_sabor: number;
    preco: number; 
}

export const PrecoPizza= sequelize.define<PrecoPizzaInstance>('PrecoPizza', {
    id_precoPizza: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_pizza: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pizza,
            key: 'id_pizza'
        }
    },
    id_sabor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sabor,
            key: 'id_sabor'
        }
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    tableName: 'PrecoPizza',
    timestamps: false
});


Pizza.hasMany(PrecoPizza, { foreignKey: 'id_pizza' });
PrecoPizza.belongsTo(Pizza, { foreignKey: 'id_pizza' });

Sabor.hasMany(PrecoPizza, { foreignKey: 'id_sabor' });
PrecoPizza.belongsTo(Sabor, { foreignKey: 'id_sabor' });