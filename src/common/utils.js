import moment from 'moment';

moment.locale('zh-cn', {
  meridiem(hours) {
    if (hours > 22 ) {
      return '深夜';
    } else if (hours > 18) {
      return '晚上';
    } else if (hours > 16) {
      return '傍晚';
    } else if (hours > 12) {
      return '下午';
    } else if (hours > 10) {
      return '中午';
    } else if (hours > 8) {
      return '上午';
    } else if (hours > 4) {
      return '早上';
    } else if (hours > 2) {
      return '凌晨';
    } else {
      return '深夜';
    }
  },
  weekdays: ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'],
});

export const timeFormat = date => moment(date).format('a hh:mm');
export const getYearMonthDay = date => {
  const result = moment(date).toArray().slice(0, 3)
  result[1] += 1;

  return result;
};

// 传一个 Date 对象或者三个 number 分别代表 year、month 和 day
export const getDateScope = (...args) => {
  
  if(args.length > 1){
    const [ year, month, day ] = args;
    const start = moment([year, month-1, day]).valueOf();
    const end = start + 86400000 - 1;
    return { start, end };
  }

  const date = moment(args[0]);
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  return getDateScope(year, month, day)
}

export function generateArray(length) {
  return [...Array(length).keys()].map(x => x+1);
}

export { moment }
