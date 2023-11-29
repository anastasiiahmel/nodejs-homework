const controlErrors = (control) => {
  const wrapper = async (req, res, next) => {
    try {
      await control(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return wrapper;
};
module.exports = {
  controlErrors,
};
