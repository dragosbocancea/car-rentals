import { default as sequelize } from "@/utils/sequelize";
import { DataTypes } from "sequelize";

const RentalRequest = sequelize.define(
  "RentalRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Cars",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rented_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "RentalRequests",
    timestamps: false,
  }
);

export default RentalRequest;
