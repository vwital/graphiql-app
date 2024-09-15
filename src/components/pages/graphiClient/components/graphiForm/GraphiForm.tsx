"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import styles from "./graphiForm.module.scss";
import { convertFromBase64, convertToBase64 } from "@/utils/convertBase64";
import { useParams, useSearchParams } from "next/navigation";
import getDefaultValue from "./utils/getDefaultValues";
import { useDispatch } from "react-redux";
import { getDocs } from "@/app/lib/features/graphClient/slice";
import JsonViewer from "@/components/JsonViewer/JsonViewer";
import { QUERY_FOR_GRAPHQL } from "../../constants";

interface FormData {
  endpoint: string;
  sdlEndpoint: string;
  query: string;
  variables: string;
  headers: { key: string; value: string }[];
}

interface SuccessResponse {
  data: Record<string, unknown>;
}

interface ErrorResponse {
  error: string;
}

type ResponseData = SuccessResponse | ErrorResponse | null;

const GraphForm = (): React.ReactNode => {
  const t = useTranslations("GraphQL");
  const router = useRouter();
  const pathname = usePathname();
  const [response, setResponse] = useState<ResponseData>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [sdlError, setSDLError] = useState<string | null>(null);
  const [variablesVisible, setVariablesVisible] = useState<boolean>(false);
  const urlParams = useParams();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const { url, headers, query } = getDefaultValue(urlParams, searchParams);
  if (!url) dispatch(getDocs(null));

  const { register, handleSubmit, watch, setValue, control } =
    useForm<FormData>({
      defaultValues: {
        headers: headers ? [...headers] : [{ key: "", value: "" }],
      },
    });

  const { fields, append } = useFieldArray({
    control,
    name: "headers",
  });

  const endpointValue = watch("endpoint");
  const queryValue = watch("query");
  const variablesValue = watch("variables");
  const headersValue = watch("headers");
  const sdlEndpoint = watch("sdlEndpoint") || `${endpointValue}?sdl`;

  const handleFormSubmit = async (data: FormData): Promise<void> => {
    const { endpoint, query, variables, headers } = data;
    const dataForLocalStorage = JSON.stringify({
      url: endpoint,
      method: "GRAPHQL",
      href: pathname,
    });

    const id = `history-${Date.now().toString()}`;
    localStorage.setItem(id, dataForLocalStorage);

    try {
      const headersObject = headers.reduce(
        (acc: Record<string, string>, { key, value }) => {
          if (key.trim() && value.trim()) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headersObject,
        },
        body: JSON.stringify({
          query,
          variables: variables ? JSON.parse(variables) : {},
        }),
      });

      const result = await res.json();
      setStatus(res.status);
      setResponse(result);
    } catch (error) {
      if (error instanceof Error) {
        setResponse({ error: "Request failed" });
      }
      setStatus(500);
    }
  };

  const fetchSDL = async (sdlEndpoint: string): Promise<void> => {
    try {
      const response = await fetch(sdlEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: QUERY_FOR_GRAPHQL }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch SDL");
      }
      const sdlData = await response.text();
      dispatch(getDocs(sdlData));

      setSDLError(null);
    } catch (e) {
      if (e instanceof Error) {
        setSDLError("Failed to load documentation");
      }
    }
  };

  useEffect(() => {
    if (
      sdlEndpoint &&
      sdlEndpoint !== "undefined?sdl" &&
      sdlEndpoint !== "?sdl"
    ) {
      fetchSDL(sdlEndpoint);
    }
  }, [sdlEndpoint]);

  useEffect(() => {
    setValue("sdlEndpoint", endpointValue ? `${endpointValue}?sdl` : "");
  }, [endpointValue, setValue]);

  const toggleVariablesVisibility = (): void => {
    setVariablesVisible((prev) => !prev);
  };

  const handleAddHeader = (): void => {
    append({ key: "", value: "" });
  };

  const handleApplyHeader = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    handleEncodeURL();
  };

  const handleEncodeURL = (): void => {
    if (endpointValue && queryValue) {
      const encodedEndpoint = convertToBase64(endpointValue);
      const encodedBody = convertToBase64(
        JSON.stringify({
          query: queryValue,
          variables: variablesValue || "{}",
        })
      );

      const headerParams = headersValue
        .filter(({ key, value }) => key.trim() && value.trim())
        .map(
          ({ key, value }) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

      const newUrl = `/graph/${encodedEndpoint}/${encodedBody}${
        headerParams ? `?${headerParams}` : ""
      }`;
      router.push(newUrl, { scroll: false });
    }
  };

  useEffect(() => {
    const { pathname, searchParams } = new URL(window.location.href);
    const parts = pathname.split("/GRAPHQL/");
    if (parts.length === 2) {
      const [encodedEndpoint, encodedBody] = parts[1].split("/");
      const decodedEndpoint = convertFromBase64(encodedEndpoint);
      const decodedBody = convertFromBase64(encodedBody);

      const bodyObject = JSON.parse(decodedBody);
      setValue("endpoint", decodedEndpoint);
      setValue("query", bodyObject.query);
      setValue("variables", bodyObject.variables);

      searchParams.forEach((value, key) => {
        append({ key, value });
      });
    }
  }, [append, setValue]);

  const handleUrlBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const base64 = convertToBase64(event.target.value);
    if (event.target.value === "") {
      return;
    }
    if (!urlParams.endpoint) {
      const newPathname = `${pathname}/${base64}`;
      router.push(newPathname);
    }
    if (urlParams.endpoint) {
      const newPathname = pathname.split("/").slice(0, 2).join("/");
      router.push(`${newPathname}/${base64}`);
    }
  };

  return (
    <form
      className={styles.graphi}
      onSubmit={handleSubmit(handleFormSubmit)}
      onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
    >
      <div className={styles.wrapper}>
        <h2>{t("header")}</h2>
        <label htmlFor="endpoint">{t("endpoint")}</label>
        <input
          className="input"
          id="endpoint"
          placeholder="URL"
          defaultValue={url}
          {...register("endpoint", { required: true })}
          onBlur={(event) => handleUrlBlur(event)}
        />
        <label htmlFor="sdlEndpoint">SDL URL</label>
        <input
          className="input"
          id="sdlEndpoint"
          placeholder="SDL URL"
          {...register("sdlEndpoint")}
        />
        <div className={styles.headersSection}>
          <p>{t("headers")}</p>
          <div>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={styles.headerRow}
              >
                <input
                  className="input"
                  placeholder={t("key")}
                  {...register(`headers.${index}.key` as const)}
                />
                <input
                  className="input"
                  placeholder={t("value")}
                  {...register(`headers.${index}.value` as const)}
                />
                <div>
                  <button
                    type="button"
                    className="button"
                    onClick={(e) => handleApplyHeader(e)}
                  >
                    {t("applyHeader")}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="button"
            onClick={handleAddHeader}
          >
            {t("addHeader")}
          </button>
        </div>
        <label htmlFor="query">{t("query")}</label>
        <textarea
          className="input"
          {...register("query", { required: true })}
          id="query"
          defaultValue={query.replace(/\\n/g, "\n")}
          rows={10}
          onBlur={handleEncodeURL}
        />
        <button
          type="button"
          className="button"
          onClick={toggleVariablesVisibility}
        >
          {variablesVisible ? t("hideVariables") : t("showVariables")}
        </button>

        {variablesVisible && (
          <>
            <label htmlFor="variables">{t("variables")}</label>
            <textarea
              className="input"
              id="variables"
              rows={5}
              {...register("variables")}
              onBlur={handleEncodeURL}
            />
          </>
        )}

        <button
          type="submit"
          className="button"
        >
          {t("submit")}
        </button>

        {sdlError && <p className={styles.error}> </p>}

        {response && (
          <div className={styles.response}>
            <h2>{t("response")}</h2>
            <h3>
              {t("statusCode")}: {status}
            </h3>
            <JsonViewer
              collapsed={false}
              response={{ response }}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default GraphForm;
