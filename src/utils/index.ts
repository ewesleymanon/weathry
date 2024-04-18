export const getFormattedDate = (): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date().toLocaleDateString('en-US', options);
};

export const getFormattedTime = (timestamp: number): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', options);
};

export const getShortWeekday = (timestamp: number): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
  };
  return new Date(timestamp * 1000).toLocaleDateString('en-US', options);
};

export const getShortMonthAndDay = (timestamp: number): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  return new Date(timestamp * 1000).toLocaleDateString('en-US', options);
};

export const capitalizeFirstLetter = (str: string): string => {
  if(!str) return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};
