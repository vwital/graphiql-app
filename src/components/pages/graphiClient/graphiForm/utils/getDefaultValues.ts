import { convertFromBase64 } from "@/utils/convertBase64";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type ReturnType = {
  headers: Record<string, string>[];
  url: string;
  body: string;
};

const getDefaultValue = (
  urlParams: Params,
  searchParams: URLSearchParams
): ReturnType => {
  const defaultValues = {
    url: "",
    body: "",
  };

  if (urlParams.endpoint) {
    defaultValues.url = convertFromBase64(urlParams.endpoint);
  }

  const queryParams = new URLSearchParams(searchParams);
  const headers: Record<string, string>[] = [];
  queryParams.forEach((value, key) => {
    headers.push({ key, value });
  });

  return { ...defaultValues, headers };
};
export default getDefaultValue;
