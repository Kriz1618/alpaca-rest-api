
export const getCronSchedule = (time: Date) => {
  const schedule: any[] = [0];
  schedule.push(time.getMinutes());
  schedule.push(time.getHours());
  schedule.push(time.getDate());
  schedule.push(time.getMonth() + 1);
  schedule.push('*');

  return schedule.join(' ');
};

export const handleError = (error: any) => {
  if (error?.response?.data) {
    return error.response.data;
  } else if (error instanceof Error) {
    return { error: error.message };
  }

  return `Internal error - ${error}`;
};

export const getDateFrom = (days: string | number) => {
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - Number(days));
  dateFrom.setHours(0,0,0,0);

  return dateFrom;
};
