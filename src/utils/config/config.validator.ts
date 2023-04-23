import "dotenv/config";
import joi from "joi";

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid("production", "development")
      .required(),
    SWAP_BASE_URL: joi.string().required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown();

const { error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}