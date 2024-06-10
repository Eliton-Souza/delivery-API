import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { Grupo } from './Grupo';
import { ProdutoSimples } from './ProdutoSimples';

//Associação entre as tabelas Pizza e Grupo Sabor
export interface AssProdutoGrupoInstance extends Model {
    id_produtoGrupo: number;
    id_produtoSimples: number;
    id_grupo: number;
    qtdComplementos: number;
}

export const AssProdutoGrupo= sequelize.define<AssProdutoGrupoInstance>('AssProdutoGrupo', {
    id_produtoGrupo: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    id_produtoSimples: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProdutoSimples,
            key: 'id_produtoSimples'
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
    qtdComplementos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'AssProdutoGrupo',
    timestamps: false
});

//Definindo relacionamento muitos para muitos
/*Pizza.hasMany(PizzaGrupoSabor, { foreignKey: 'id_pizza' });
PizzaGrupoSabor.belongsTo(Pizza, { foreignKey: 'id_pizzaGrupo' });

GrupoSabor.hasMany(PizzaGrupoSabor, { foreignKey: 'id_grupo' });
PizzaGrupoSabor.belongsTo(GrupoSabor, { foreignKey: 'id_pizzaGrupo' });*/

// Definir relacionamentos muitos-para-muitos
ProdutoSimples.belongsToMany(Grupo, { through: AssProdutoGrupo, foreignKey: 'id_produtoSimples' });
Grupo.belongsToMany(ProdutoSimples, { through: AssProdutoGrupo, foreignKey: 'id_grupo' });