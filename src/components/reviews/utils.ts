export const formatedDate = (serverDate: string): string => {
  const date = new Date(serverDate);
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
};
