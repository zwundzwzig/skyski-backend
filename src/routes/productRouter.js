const router = require("express").Router();
const { productController } = require("../controllers");

router.get("", productController.getPriceFirst);
router.get("/second", productController.getPriceSecond);

module.exports = router;
