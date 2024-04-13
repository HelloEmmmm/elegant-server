export const getToken = (str: string): string => {
  const [_, token] = str?.split(' ');
  return token;
};
