import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Pizza } from './Pizza';
import { GrupoSabor } from './GrupoSabor';

//Associação entre as tabelas Pizza e Grupo Sabor
export interface AssPizzaGrupoSaborInstance extends Model {
    id_pizzaGrupo: number;
    id_pizza: number;
    id_grupo: number;
}

export const AssPizzaGrupoSabor= sequelize.define<AssPizzaGrupoSaborInstance>('AssPizzaGrupoSabor', {
    id_pizzaGrupo: {
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
    id_grupo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GrupoSabor,
            key: 'id_grupo'
        }
    },
}, {
    tableName: 'AssPizzaGrupoSabor',
    timestamps: false
});

//Definindo relacionamento muitos para muitos
/*Pizza.hasMany(PizzaGrupoSabor, { foreignKey: 'id_pizza' });
PizzaGrupoSabor.belongsTo(Pizza, { foreignKey: 'id_pizzaGrupo' });

GrupoSabor.hasMany(PizzaGrupoSabor, { foreignKey: 'id_grupo' });
PizzaGrupoSabor.belongsTo(GrupoSabor, { foreignKey: 'id_pizzaGrupo' });*/

// Definir relacionamentos muitos-para-muitos
Pizza.belongsToMany(GrupoSabor, { through: AssPizzaGrupoSabor, foreignKey: 'id_pizza' });
GrupoSabor.belongsToMany(Pizza, { through: AssPizzaGrupoSabor, foreignKey: 'id_grupo' });