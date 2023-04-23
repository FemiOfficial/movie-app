import { DataSource } from "typeorm";
import { NODE_ENV } from "../consts";
import { dbConfig } from "../utils/config/db.config";
import Logger from '../utils/logger'

const logger = new Logger('datasource');
const AppDataSource = new DataSource(dbConfig[NODE_ENV]);

AppDataSource.initialize()
  .then(() => {
    logger.log("Data Source has been initialized!");
  })
  .catch((err) => {
    logger.log("Error during Data Source initialization");
    logger.log(err)
  });

export default AppDataSource;
