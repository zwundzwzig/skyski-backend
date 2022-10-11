const { productDao } = require("../models");

const getPriceFirst = async () => {
  const result = await productDao.getPriceByDate();
  let fake = [
    [
      { Ddate: 2, Adate: 2, price: [] },
      { Ddate: 3, Adate: 3, price: [] },
      { Ddate: 4, Adate: 4, price: [] },
      { Ddate: 5, Adate: 5, price: [] },
      { Ddate: 6, Adate: 6, price: [] },
      { Ddate: 7, Adate: 7, price: [] },
      { Ddate: 8, Adate: 8, price: [] },
    ],
    [
      { Ddate: 30, Adate: 30, price: 138610 },
      { Ddate: 31, Adate: 31, price: 119990 },
      { Ddate: 1, Adate: 1, price: [] },
      { Ddate: 2, Adate: 2, price: [] },
      { Ddate: 3, Adate: 3, price: [] },
      { Ddate: 4, Adate: 4, price: [] },
      { Ddate: 5, Adate: 5, price: [] },
    ],
    [
      { Ddate: 9, Adate: 9, price: [] },
      { Ddate: 10, Adate: 10, price: [] },
      { Ddate: 11, Adate: 11, price: [] },
      { Ddate: 12, Adate: 12, price: [] },
      { Ddate: 13, Adate: 13, price: 123849 },
      { Ddate: 14, Adate: 14, price: 135673 },
      { Ddate: 15, Adate: 15, price: 413578 },
    ],
    [
      { Ddate: 25, Adate: 25, price: [] },
      { Ddate: 26, Adate: 26, price: [] },
      { Ddate: 27, Adate: 27, price: [] },
      { Ddate: 28, Adate: 28, price: [] },
      { Ddate: 29, Adate: 29, price: [] },
      { Ddate: 30, Adate: 30, price: [] },
      { Ddate: 1, Adate: 1, price: [] },
    ],
  ];

  const data = () => {
    let arr1 = [];
    let arr2 = [];
    arr1.push(fake[0]);
    arr2.push(...arr1);
    arr1 = [];
    arr1.push(fake[2]);
    arr2.push(...arr1);
    arr1 = [];
    for (let i = 15; i < 22; i++) {
      arr1.push(result[i]);
    }
    arr2.push(arr1);
    arr1 = [];
    for (let i = 22; i < 29; i++) {
      arr1.push(result[i]);
    }
    arr2.push(arr1);
    arr1 = [];
    arr1.push(fake[1]);
    arr2.push(...arr1);
    arr1 = [];
    arr1.push(fake[3]);
    arr2.unshift(...arr1);
    return arr2;
  };
  let arr3 = [];
  arr3.push(...data());

  console.log(arr3);
  return arr3;
};

const getPriceSecond = async () => {
  let fake2 = [
    [
      { Ddate: 30, Adate: 30, price: [] },
      { Ddate: 31, Adate: 31, price: [] },
      { Ddate: 1, Adate: 1, price: 134741 },
      { Ddate: 2, Adate: 2, price: 324981 },
      { Ddate: 3, Adate: 3, price: 239823 },
      { Ddate: 4, Adate: 4, price: 123512 },
      { Ddate: 5, Adate: 5, price: 234879 },
    ],
    [
      { Ddate: 6, Adate: 6, price: 131434 },
      { Ddate: 7, Adate: 7, price: 125514 },
      { Ddate: 8, Adate: 8, price: 134565 },
      { Ddate: 9, Adate: 9, price: 12435 },
      { Ddate: 10, Adate: 10, price: 489764 },
      { Ddate: 11, Adate: 11, price: 348792 },
      { Ddate: 12, Adate: 12, price: 345187 },
    ],
    [
      { Ddate: 13, Adate: 13, price: 131634 },
      { Ddate: 14, Adate: 14, price: 125194 },
      { Ddate: 15, Adate: 15, price: 934645 },
      { Ddate: 16, Adate: 16, price: 235466 },
      { Ddate: 17, Adate: 17, price: 213235 },
      { Ddate: 18, Adate: 18, price: 324789 },
      { Ddate: 19, Adate: 19, price: 315476 },
    ],
    [
      { Ddate: 20, Adate: 20, price: 131423 },
      { Ddate: 21, Adate: 21, price: [] },
      { Ddate: 22, Adate: 22, price: [] },
      { Ddate: 23, Adate: 23, price: [] },
      { Ddate: 24, Adate: 24, price: [] },
      { Ddate: 25, Adate: 25, price: [] },
      { Ddate: 26, Adate: 26, price: [] },
    ],
    [
      { Ddate: 27, Adate: 27, price: [] },
      { Ddate: 28, Adate: 28, price: [] },
      { Ddate: 29, Adate: 29, price: [] },
      { Ddate: 30, Adate: 30, price: [] },
      { Ddate: 1, Adate: 1, price: [] },
      { Ddate: 2, Adate: 2, price: [] },
      { Ddate: 3, Adate: 3, price: [] },
    ],
    [
      { Ddate: 4, Adate: 4, price: [] },
      { Ddate: 5, Adate: 5, price: [] },
      { Ddate: 6, Adate: 6, price: [] },
      { Ddate: 7, Adate: 7, price: [] },
      { Ddate: 8, Adate: 8, price: [] },
      { Ddate: 9, Adate: 9, price: [] },
      { Ddate: 10, Adate: 10, price: [] },
    ],
  ];

  let arr4 = [];
  arr4.push(...fake2);
  return arr4;
};

module.exports = {
  getPriceFirst,
  getPriceSecond,
};
