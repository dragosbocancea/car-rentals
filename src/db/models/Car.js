import { default as sequelize } from "@/utils/sequelize";
import { DataTypes } from "sequelize";

const Car = sequelize.define("Car", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year_of_production: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cost_per_hour: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Car;
