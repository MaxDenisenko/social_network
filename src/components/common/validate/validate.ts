export type FiledValidateType = (value: string) => string | undefined;

export const requiredField: FiledValidateType = (value) => {
  if (value) return undefined;
  return 'Field requred;';
};
export const maxLength30ThunkCreator =
  (maxLength: number): FiledValidateType =>
  (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
  };
export const minLength3: FiledValidateType = (value) => {
  if (value && value.length < 3) return 'Min length is 3 symbols';
  return undefined;
};
