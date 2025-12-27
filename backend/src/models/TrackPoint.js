import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const TrackPoint = sequelize.define("TrackPoint", {
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// 🔗 RELACIÓN
TrackPoint.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

User.hasMany(TrackPoint, {
  foreignKey: "userId",
});

export default TrackPoint;
