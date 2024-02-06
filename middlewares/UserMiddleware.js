import Joi from "joi";
import { errorLogger, infoLogger } from "../services/LoggerService.js";

export const userValidationSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().required(),
  username: Joi.string().email().required(),
}).unknown(true);

export const validateUserDetails = (req, res, next) => {
    infoLogger.info(req.body)
  const { error, value } = userValidationSchema.validate(req.body);
  if (error) {
    errorLogger.error('Bad Request: User creation validation', error.details)
    res.status(400).json({ message: 'User validation failed: ' + error.details[0].message }).end()
    return res
  } 
  next()
};
