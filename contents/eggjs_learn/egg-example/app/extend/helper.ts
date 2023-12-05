var dayjs = require('dayjs');

// const Dayjs = require('dayjs');
exports.forMatTime = (receive) => {
  return dayjs(receive).format('YYYY-MM-DD HH:mm:ss');
};
