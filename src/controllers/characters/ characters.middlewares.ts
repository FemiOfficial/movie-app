import { Joi, validate } from "express-validation";

export const GetCharacterValidatorSchema = validate({
  query: Joi.object({
    page: Joi.number().min(1).allow("").optional(),
    limit: Joi.number().min(10).allow("").optional(),
    character_gender: Joi.string().allow("").optional(),
    sort_by: Joi.string().allow("").optional(),
  }),
});
