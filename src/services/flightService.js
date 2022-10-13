const { flightDao } = require('../models');

const getFlights = async (query) => {

  const Departure = Object.freeze({
    GMP: 1,
    PUS: 2,
    CJU: 3
  })
  const departureId = Departure[query.departure]

  const Arrival = Object.freeze({
    GMP: 1,
    PUS: 2,
    CJU: 3
  })
  const arrivalId = Arrival[query.arrival]
  const getRoute = await flightDao.getRoute(departureId, arrivalId)

  if (!Array.isArray(query.exceptAirline)) query.exceptAirline = [query.exceptAirline]

  const airlineId = [];
  query.exceptAirline.map(el => {
    let airline = ''
    if (el == "KE") {
      airline = 1
    } else if (el == "OZ") {
      airline = 2
    } else if (el == "7C") {
      airline = 3
    }
    airlineId.push(airline)
  })
  query.airline = airlineId

  if (query.departureTime) {
    query.departureTime1 = query.departureTime.substr(0, 2) + ":" + query.departureTime.substr(2, 2)
    query.departureTime2 = query.departureTime.substr(4, 2) + ":" + query.departureTime.substr(6, 2)

  }
  if (query.arrivalTime) {
    query.arrivalTime1 = query.arrivalTime.substr(0, 2) + ":" + query.arrivalTime.substr(2, 2)
    query.arrivalTime2 = query.arrivalTime.substr(4, 2) + ":" + query.arrivalTime.substr(6, 2)
  }

  let getFlights;
  if (query.roundTrip == 'T') {
    getFlights = await flightDao.getRoundTrip(getRoute, query)
  } else {
    getFlights = await flightDao.getOneWayTrip(getRoute, query)
  }

  if (getFlights.eco1 == '친환경' || getFlights.eco2 == '친환경') {
    getFlights.totalEco = 'T'
  }

  getFlights.map(el => {
    if (el.eco1 == '친환경' || el.eco2 == '친환경') {
      el.totalEco = 'T'
    }
  })

  return getFlights;
};

module.exports = {
  getFlights
}