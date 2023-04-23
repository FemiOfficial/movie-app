import { DataSource } from "typeorm";
import { NODE_ENV } from "../consts";
import { dbConfig } from "../utils/config/db.config";

const AppDataSource = new DataSource(dbConfig[NODE_ENV]);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default AppDataSource;
