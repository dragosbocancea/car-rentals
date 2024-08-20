import { Sequelize } from "sequelize";
import pg from "pg";

const sequelize = new Sequelize({
  host: "127.0.0.1",
  username: "postgres",
  password: "1234",
  database: "car-rentals",
  dialect: "postgres",
  dialectModule: pg,
  protocol: "postgres",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log("Unable to connect to the DB:", error);
  }
})();

export default sequelize;
