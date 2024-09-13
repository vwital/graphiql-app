import { convertFromBase64 } from "@/utils/convertBase64";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const getDefaultValue = (urlParams: Params): { url: string; body: string } => {
  const defaultValues = {
    url: "",
    body: "",
  };
  if (urlParams.requestUrl) {
    const [url, body] = urlParams.requestUrl;
    defaultValues.url = convertFromBase64(url);
    defaultValues.body = body && convertFromBase64(body);
  }
  return defaultValues;
};
export default getDefaultValue;
