"use server";

const restClientFormAction = async (
  _previousState: unknown,
  data: FormData
): Promise<unknown> => {
  const {
    url,
    method,
    "body.0.value": body,
    ...headers
  } = Object.fromEntries(data);

  const createHeader = (): Record<string, string> => {
    const result: Record<string, string> = {};
    const headerValues = Object.values(headers);
    for (let i = 0; i < headerValues.length; i++) {
      if (i % 2 === 0) {
        result[`${headerValues[i]}`] = `${headerValues[i + 1]}`;
      }
    }
    return result;
  };

  const options = {
    method: method.toString(),
    body: body ?? null,
    headers: {
      ...createHeader(),
    },
  };

  const response = await fetch(url.toString(), options);
  const dataFromResponse = await response.json();

  return {
    dataFromResponse,
    statusCode: response.status,
    statusText: response.statusText,
  };
};

export default restClientFormAction;
