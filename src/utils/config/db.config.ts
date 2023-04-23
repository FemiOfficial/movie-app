import { DATABASE_URL, NODE_ENV } from "../../consts";
import { DataSourceOptions } from "typeorm";

const currentEnv = NODE_ENV;
console.log(["production"].includes(currentEnv));
const connectionOptions: DataSourceOptions = {
  type: "postgres",
  logging: true,
  schema: "public",
  dropSchema: false,
  synchronize: false,
  migrationsRun: true,
  entities: ["production"].includes(currentEnv)
    ? ["dist/**/*.entity.js"]
    : ["src/**/*.entity.ts"],
  migrations: ["production"].includes(currentEnv)
    ? ["dist/db/migrations/*.js"]
    : ["src/db/migrations/*.ts"],
};


export type IDBConfig = {
    [index: string]:DataSourceOptions;
  };
  

export const dbConfig: IDBConfig = {
  production: {
    ...connectionOptions,
    url: DATABASE_URL,
  },
  development: {
    ...connectionOptions,
    url: DATABASE_URL,
  },
  test: {
    ...connectionOptions,
    url: `postgres://postgres@localhost:${
      process.env.DOCKER_DB_PORT || 5432
    }/moviestest`,
  },
};
