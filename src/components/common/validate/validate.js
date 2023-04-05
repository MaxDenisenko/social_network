export const requiredField = (value) => {
  if (value) return undefined;
  return 'Field requred;';
};
export const maxLength30ThunkCreator = (maxLength) => (value) => {
  if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
  return undefined;
};
export const minLength3 = (value) => {
  if (value && value.length < 3) return 'Min length is 3 symbols';
  return undefined;
};
