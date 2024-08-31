const convertToBase64 = (url: string): string => {
  const data = JSON.stringify({ url });
  const buff = Buffer.from(data);
  return buff.toString("base64");
};

const convertFromBase64 = (base64: string): string => {
  const buff = Buffer.from(base64, "base64");
  const data = buff.toString("utf8");
  return JSON.parse(data).url;
};

export { convertFromBase64, convertToBase64 };
