const validate = (schema) => async (req, res, next) => {
  try {
    const validated = await schema.validateAsync(req.body);
    req.body = validated;
    next();
  } catch (error) {
    res.status(400).json({ msg: "middleware validator not exit", error });
  }
};
module.exports = validate;
