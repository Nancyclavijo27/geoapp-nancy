import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "Sin nombre"
},

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Para que no haya dos usuarios con el mismo correo
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user", // 👈 CLAVE
  },
});

export default User;
