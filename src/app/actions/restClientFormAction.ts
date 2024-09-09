"use server";

const restClientFormAction = async (
  _previousState: unknown,
  data: FormData
): Promise<object> => {
  const { url, method } = Object.fromEntries(data);
  const options = {
    method: method.toString(),
  };

  const response = await fetch(url.toString(), options);
  const dataFromResponse = await response.json();

  return { dataFromResponse, statusCode: response.status };
};

export default restClientFormAction;
