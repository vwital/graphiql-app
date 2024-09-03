const isJson = (text: string): boolean => {
  try {
    JSON.parse(text);
  } catch {
    return false;
  }
  return true;
};

export default isJson;
