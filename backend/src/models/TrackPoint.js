import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TrackPoint = sequelize.define("TrackPoint", {
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default TrackPoint;
