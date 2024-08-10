import { DataTypes } from "sequelize";
import { sequelize } from "../DB/conexion.js";
export const UsuarioModel = sequelize.define(
  "usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    timestamps: false,
  }
);
