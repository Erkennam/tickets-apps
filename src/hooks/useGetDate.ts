import { format, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';

export const useGetDate = (inputDate: Date | any): string => {
  const now = new Date();
  if (isToday(inputDate)) {
    return format(inputDate, 'HH:mm', { locale: ru });
  } else {
    return format(inputDate, 'd MMMM HH:mm', { locale: ru });
  }
};
