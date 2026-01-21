import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Route = sequelize.define("Route", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  distanceKm: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  durationMin: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  startedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  // 👉 NUEVO CAMPO (solo esto agregas)
  path: {
    type: DataTypes.JSON,
    allowNull: true,
  }
});

export default Route;
