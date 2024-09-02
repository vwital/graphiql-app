const convertToBase64 = (url: string): string => btoa(url);

const convertFromBase64 = (base64: string | string[]): string =>
  atob(base64.toString().replace(/%3D{1,}/g, ""));

export { convertFromBase64, convertToBase64 };
