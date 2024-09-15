"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import JsonViewer from "../../../JsonViewer/JsonViewer";
import styles from "./graphiForm.module.scss";
import { convertFromBase64, convertToBase64 } from "@/utils/convertBase64";

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

const GraphiForm = (): React.ReactNode => {
  const { register, handleSubmit, watch, setValue, control } =
    useForm<FormData>({
      defaultValues: { headers: [{ key: "", value: "" }] },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "headers",
  });

  const t = useTranslations("GraphiQL");
  const router = useRouter();
  const path = usePathname();
  const endpointValue = watch("endpoint");
  const queryValue = watch("query");
  const variablesValue = watch("variables");
  const headersValue = watch("headers");
  const sdlEndpoint = watch("sdlEndpoint") || `${endpointValue}?sdl`;
  const [response, setResponse] = useState<ResponseData>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [schema, setSchema] = useState<string | null>(null);
  const [sdlError, setSDLError] = useState<string | null>(null);
  const [variablesVisible, setVariablesVisible] = useState<boolean>(false);

  const handleFormSubmit = async (data: FormData): Promise<void> => {
    const { endpoint, query, variables, headers } = data;
    const dataForLocalStorage = JSON.stringify({
      url: endpoint,
      method: "GRAPHQL",
      href: path,
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
      const res = await fetch(sdlEndpoint);

      if (!res.ok) {
        throw new Error("Failed to fetch SDL");
      }
      const sdlData = await res.text();
      setSchema(sdlData);
      setSDLError(null);
    } catch (e) {
      if (e instanceof Error) {
        setSDLError("Failed to load documentation");
      }
      setSchema(null);
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

  const handleRemoveHeader = (index: number): void => {
    remove(index);
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

      const newUrl = `/GRAPHQL/${encodedEndpoint}/${encodedBody}${
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
      remove();

      searchParams.forEach((value, key) => {
        append({ key, value });
      });
    }
  }, [append, remove, setValue]);

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
          {...register("endpoint", { required: true })}
          onBlur={handleEncodeURL}
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
                    onClick={() => handleRemoveHeader(index)}
                  >
                    {t("removeHeader")}
                  </button>
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
          rows={5}
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

        {schema && !schema.includes("<!DOCTYPE") && (
          <div className={styles.sdlSchema}>
            <h2>{t("documentation")}</h2>
            <pre>{schema}</pre>
          </div>
        )}

        {sdlError && <p className={styles.error}> </p>}

        {response && (
          <div className={styles.response}>
            <h2>{t("response")}</h2>
            <h3>
              {t("statusCode")}: {status}
            </h3>
            <JsonViewer response={{ response }} />
          </div>
        )}
      </div>
    </form>
  );
};

export default GraphiForm;
