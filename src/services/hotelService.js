const { hotelDao } = require("../models");

const getHotlesNearByAirport = async (filter, flightFirst, flightSecond, limit) => {
  return await hotelDao.getHotlesNearByAirport(filter, flightFirst, flightSecond, limit);
};

module.exports = {
  getHotlesNearByAirport,
};
