import dayjs from 'dayjs';

export const formatDate = (date: number | string | Date) => {
  return dayjs(date).format('MMM D, YYYY');
};
