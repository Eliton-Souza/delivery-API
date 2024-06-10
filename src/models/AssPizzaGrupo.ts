import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Grupo } from './Grupo';
import { Pizza } from './Pizza';

//Associação entre as tabelas Pizza e Grupo Sabor
export interface AssPizzaGrupoInstance extends Model {
    id_pizzaGrupo: number;
    id_pizza: number;
    id_grupo: number;
}

export const AssPizzaGrupo= sequelize.define<AssPizzaGrupoInstance>('AssPizzaGrupo', {
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
            model: Grupo,
            key: 'id_grupo'
        }
    },
}, {
    tableName: 'AssPizzaGrupo',
    timestamps: false
});

//Definindo relacionamento muitos para muitos
/*Pizza.hasMany(PizzaGrupoSabor, { foreignKey: 'id_pizza' });
PizzaGrupoSabor.belongsTo(Pizza, { foreignKey: 'id_pizzaGrupo' });

GrupoSabor.hasMany(PizzaGrupoSabor, { foreignKey: 'id_grupo' });
PizzaGrupoSabor.belongsTo(GrupoSabor, { foreignKey: 'id_pizzaGrupo' });*/

// Definir relacionamentos muitos-para-muitos
Pizza.belongsToMany(Grupo, { through: AssPizzaGrupo, foreignKey: 'id_pizza' });
Grupo.belongsToMany(Pizza, { through: AssPizzaGrupo, foreignKey: 'id_grupo' });