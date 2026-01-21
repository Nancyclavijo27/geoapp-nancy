import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TrackPoint = sequelize.define(
  "TrackPoint",
  {
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,   // 🔹 CLAVE PARA EVITAR TU ERROR
    },
  },
  {
    timestamps: true,
  }
);

export default TrackPoint;
