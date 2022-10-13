const { productService } = require("../services");

const getPriceFirst = async (req, res) => {
  const result = await productService.getPriceFirst();
  return res.status(200).json({ result });
};

const getPriceSecond = async (req, res) => {
  const result = await productService.getPriceSecond();
  return res.status(200).json({ result });
};

module.exports = {
  getPriceFirst,
  getPriceSecond,
};
