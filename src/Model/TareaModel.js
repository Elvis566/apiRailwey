import { DataTypes } from "sequelize";
import { sequelize } from "../DB/conexion.js";
import { CategoriaModel } from './Categoria.js';
import { UsuarioModel } from './UsuarioModel.js'
export const TareaModel = sequelize.define("tareas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detalles: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disponibilidad: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
},
{
    timestamps :false
});

CategoriaModel.hasMany(TareaModel, { foreignKey: "categoria_id" });
TareaModel.belongsTo(CategoriaModel, { foreignKey: "categoria_id" });

UsuarioModel.hasMany(TareaModel, { foreignKey: "usuario_id" });
TareaModel.belongsTo(UsuarioModel, { foreignKey: "usuario_id" });