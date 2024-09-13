"use server";

const restClientFormAction = async (
  _previousState: unknown,
  data: FormData
): Promise<unknown> => {
  const { url, method, ...props } = Object.fromEntries(data);
  const body = props["body.0.value"];

  const options = {
    method: method.toString(),
    body: body ?? null,
    headers: {
      "Content-Type": "application/json",
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
