const dataSource = require("./dataSource");

const getPriceByDate = async () => {
  return await dataSource.query(`
    SELECT
        day(departure_date) as Ddate,
        day(arrival_date) as Adate,
        price
        FROM flights
          GROUP BY day(departure_date)
          ORDER BY day(departure_date) ASC
    `);
};

module.exports = { getPriceByDate };
