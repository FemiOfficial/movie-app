import { Joi, validate } from "express-validation";

export const GetCommentValidatorSchema = validate({
  query: Joi.object({
    page: Joi.number().min(1).allow("").optional(),
    limit: Joi.number().min(10).allow("").optional(),
    movie_id: Joi.number().required(),
    sort_by: Joi.string().allow("").optional(),
  }),
});


export const AddCommentValidatorSchema = validate({
  body: Joi.object({
    comment: Joi.string().max(500).allow("").required(),
    movie_id: Joi.string().required(),
  }),
});
