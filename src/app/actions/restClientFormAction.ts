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
    const arrHeaderValues: string[] = [];
    const sorted = Object.keys(headers).filter((key) =>
      key.startsWith("headers")
    );
    sorted.map((key) => {
      arrHeaderValues.push(`${headers[key]}`.trim());
    });

    for (let i = 0; i < arrHeaderValues.length; i++) {
      if (i % 2 === 0) {
        result[arrHeaderValues[i]] = arrHeaderValues[i + 1];
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
  const contentType = response.headers.get("Content-Type");
  let dataFromResponse;
  if (contentType && contentType.includes("application/json")) {
    try {
      dataFromResponse = await response.json();
    } catch {
      dataFromResponse = {};
    }
  } else if (contentType && contentType.includes("text/")) {
    dataFromResponse = (await response.text()).split("\n");
  } else {
    dataFromResponse = {};
  }

  return {
    dataFromResponse,
    statusCode: response.status,
    statusText: response.statusText,
  };
};

export default restClientFormAction;
