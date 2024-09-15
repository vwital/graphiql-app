import { convertFromBase64 } from "@/utils/convertBase64";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

type ReturnType = {
  headers: Record<string, string>[];
  url: string;
  query: string;
};

const getDefaultValue = (
  urlParams: Params,
  searchParams: URLSearchParams
): ReturnType => {
  const defaultValues = {
    url: "",
    query: "",
  };

  if (urlParams.endpoint) {
    defaultValues.url = convertFromBase64(urlParams.endpoint);
  }

  if (urlParams.url) {
    defaultValues.query = convertFromBase64(urlParams.url);
  }

  const queryParams = new URLSearchParams(searchParams);
  const headers: Record<string, string>[] = [];
  queryParams.forEach((value, key) => {
    headers.push({ key, value });
  });

  return { ...defaultValues, headers };
};
export default getDefaultValue;
