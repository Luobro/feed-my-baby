import moment from 'moment';

moment.locale('zh-cn', {
  meridiem(hours) {
    return hours < 12 ? '上午' : '下午';
  }
});

export const timeFormat = timestamp => moment(timestamp).format('hh:mm a');