import moment from 'moment';

export function isAfterFlag(endTime?: number) {
  const today = moment().format('YYYY-MM-DD');
  const isAfterDate = moment(today).isAfter(
    moment(endTime).format('YYYY-MM-DD'),
    'day'
  );

  return isAfterDate;
}
