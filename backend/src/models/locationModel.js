import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Location = sequelize.define("Location", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  lat: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },

  lng: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },

  info: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Location;
