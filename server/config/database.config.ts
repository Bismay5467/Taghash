const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST as string,
  port: Number(process.env.MYSQL_PORT) as number,
  username: process.env.MYSQL_USER as string,
  password: process.env.PASSWORD as string,
  database: process.env.DATABASE as string,
  logging: true,
  synchronize: true,
  entities: [User],
  subscribers: [],
});

export default AppDataSource;
