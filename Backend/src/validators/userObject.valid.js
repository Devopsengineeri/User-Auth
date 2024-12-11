const j = require("joi");
const userObjectSchema = j.object({
  firstName: j.string().trim().min(3).max(20).required(true).messages({
    "string.empty": "firstName is required",
    "string.min": "firstName must be at least 3 chars",
    "string.max": "Name must not be more than 20 chars",
  }),

  lastName: j.string().trim().min(3).max(20).required(true).messages({
    "string.empty": "lastName is required",
    "string.min": "lastName must be at least 3 chars",
    "string.max": "lastName must not be more than 20 chars",
  }),
  email: j.string().trim().min(5).max(20).required(true).messages({
    "string.empty": "email is required",
    "string.min": "email must be at least 5 chars",
    "string.max": "email must not be more than 20 chars",
  }),

  dob: j.string().trim().required(true).messages({
    "string.empty": "email is required",
  }),
  password: j.string().trim().min(5).max(25).required(true).messages({
    "string.empty": "password is required",
    "string.min": "password must be at least 5 chars",
    "string.max": "password must not be more than 25 chars",
  }),

  confirmPassword: j.string().valid(j.ref("password")).required(true).messages({
    "any-only": "Confirm password must match password",
    "string.empty": "conform is required",
  }),
  isAuth: j.string(),
});
module.exports = userObjectSchema;
