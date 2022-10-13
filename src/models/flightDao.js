const dataSource = require('./dataSource');

const getRoute = async (departureId, arrivalId) => {
  const result = await dataSource.query(
    `
  SELECT distinct
  ro.id,
  ro.departure,
  ro.arrival
  FROM routes ro
  INNER JOIN airports a ON ro.departure = a.id
  INNER JOIN regions re ON re.id = a.region_id
  WHERE (ro.departure = ? AND ro.arrival = ?) OR (ro.departure = ? AND ro.arrival = ?) 
  `, [departureId, arrivalId, arrivalId, departureId]
  )
  return result;
}

const getRoundTrip = async (getRoute, query) => {

  const routeId = [];
  getRoute.map(el => {
    routeId.push(el.id)
  })
  if (query.departureTime == '00000000' || query.departureTime == undefined) {
    query.departureTime1 = '00:00'
    query.departureTime2 = '24:00'
  }

  if (query.arrivalTime == '00000000' || query.arrivalTime == undefined) {
    query.arrivalTime1 = '00:00'
    query.arrivalTime2 = '24:00'
  }

  let sort = '';
  if (query.sort == 'minPrice' || query.sort == undefined) {
    sort = 'totalPrice'
  } else if (query.sort == 'minDuration') {
    sort = 'totalDuration'
  }

  let filterEco = '';
  if (query.eco == 'true') {
    filterEco = `AND (f.eco = '친환경' AND f2.eco = '친환경')`
  }
  const result = await dataSource.query(
    `
    SELECT distinct
    f.id AS flightId1,
    ro.id AS routeId1,
    CASE WHEN re1.id = ro.departure THEN re1.name END AS departure1,
    CASE WHEN re2.id = ro.arrival THEN re2.name END AS arrival1,
    LEFT(f.departure_date,10) AS departureDate1,
    SUBSTRING(f.departure_date,12,5) AS departureTime1,
    SUBSTRING(f.arrival_date,12,5) AS arrivalTime1,
    f.duration AS duration1,
    f.eco AS eco1,
    al.name AS airlineName1,
    al.image AS airlineImage1,
    f.price AS price1,
    f2.id AS flightId2,
    ro2.id AS routeId2,
    CASE WHEN re4.id = ro2.arrival THEN re2.name END AS departure2,
    CASE WHEN re3.id = ro2.departure THEN re1.name END AS arrival2,
    LEFT(f2.departure_date,10) AS departureDate2,
    SUBSTRING(f2.departure_date,12,5) AS departureTime2,
    SUBSTRING(f2.arrival_date,12,5) AS arrivalTime2,
    f2.duration AS duration2,
    al2.name AS airlineName2,
    al2.image AS airlineImage2,
    f2.price AS price2,
    f2.eco AS eco2,
    f.price + f2.price AS totalPrice,
    f.duration + f2.duration AS totalDuration

  FROM flights f
  
  INNER JOIN flights f2 ON f2.seat = f.seat 
  
  INNER JOIN routes ro ON ro.id = f.route_id
  INNER JOIN regions re1 ON re1.id = ro.departure
  INNER JOIN regions re2 ON re2.id = ro.arrival
  INNER JOIN airlines al ON al.id = f.airline_id

  INNER JOIN routes ro2 ON ro2.id = f2.route_id
  INNER JOIN regions re3 ON re3.id = ro2.departure
  INNER JOIN regions re4 ON re4.id = ro2.arrival
  INNER JOIN airlines al2 ON al2.id = f2.airline_id
  
  WHERE (LEFT(f.departure_date,10) < LEFT(f2.departure_date,10))
  AND (ro.id = ? AND ro2.id = ?)
  AND (LEFT(f.departure_date,10) = ? AND LEFT(f2.departure_date,10) = ?)
  AND (f.seat = ? AND f2.seat = ?)
  AND (SUBSTRING(f.departure_date,12,5) > ? AND SUBSTRING(f.departure_date,12,5) < ?)
  AND (SUBSTRING(f2.departure_date,12,5) >= ? AND SUBSTRING(f2.departure_date,12,5) < ?)
  ${filterEco}
  AND NOT (al.id IN (?) OR al2.id IN (?))
  
  ORDER BY ${sort}
  ASC
  ` ,
    [routeId[0], routeId[1],
    query.departureDate, query.arrivalDate,
    query.flightSeatClass, query.flightSeatClass,
    query.departureTime1, query.departureTime2,
    query.arrivalTime1, query.arrivalTime2,
    query.airline, query.airline]
  )
  return result;
}

const getOneWayTrip = async (getRoute, query) => {

  const routeId = [];
  getRoute.map(el => {
    routeId.push(el.id)
  })

  if (query.departureTime == undefined || query.departureTime == '00000000') {
    query.departureTime1 = '00:00'
    query.departureTime2 = '24:00'
  }
  let sort = '';
  if (query.sort == 'minPrice' || query.sort == undefined) {
    sort = 'f.price'
  } else if (query.sort == "minDuration") {
    sort = 'f.duration'
  }

  let filterEco = '';
  if (query.eco == 'true') {
    filterEco = `AND f.eco = '친환경'`
  }
  const result = await dataSource.query(
    `
    SELECT distinct
    f.id AS flightId1,
    ro.id AS routeId1,
    CASE WHEN re1.id = ro.departure THEN re1.name END AS departure1,
    CASE WHEN re2.id = ro.arrival THEN re2.name END AS arrival1,
    LEFT(f.departure_date,10) AS departureDate1,
    SUBSTRING(f.departure_date,12,5) AS departureTime1,
    SUBSTRING(f.arrival_date,12,5) AS arrivalTime1,
    f.duration AS totalDuration,
    f.eco AS eco1,
    al.name AS airlineName1,
    al.image AS airlineImage1,
    f.price AS totalPrice
    
  FROM flights f
    
  INNER JOIN routes ro ON ro.id = f.route_id
  INNER JOIN regions re1 ON re1.id = ro.departure
  INNER JOIN regions re2 ON re2.id = ro.arrival
  INNER JOIN airlines al ON al.id = f.airline_id
  
  WHERE ro.id = ?
  AND LEFT(f.departure_date,10) = ?
  AND f.seat = ?
  AND (SUBSTRING(f.departure_date,12,5) >= ? AND SUBSTRING(f.departure_date,12,5) < ?)
  ${filterEco}
  AND NOT (al.id IN (?))
  ORDER BY ${sort} ASC
  ` ,
    [routeId[0],
    query.departureDate,
    query.flightSeatClass,
    query.departureTime1, query.departureTime2,
    query.airline]
  )
  return result;
}

module.exports = {
  getRoute,
  getRoundTrip,
  getOneWayTrip,

}
