const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const hotelRouter = require("./hotelRouter");
const productRouter = require("./productRouter");
const flightRouter = require("./flightRouter");

router.use("/oauth", userRouter);
router.use("/hotel", hotelRouter);
router.use("/flight", flightRouter);
router.use("/price", productRouter);

module.exports = router;