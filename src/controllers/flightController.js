const { flightService } = require('../services');
const { catchAsync, ApiError } = require('../utils');

const getFlights = catchAsync(async (req, res) => {
  console.log('query : ', req.query)
  const getFlights = await flightService.getFlights(req.query);
  console.log('result : ', getFlights)
  res.status(200).send(getFlights);
});


module.exports = {
  getFlights
}