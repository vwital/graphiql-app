"use client";

import React, { useState } from "react";
import GraphiForm from "@/components/graphiForm/GraphiForm";
import GraphiResponse from "@/components/graphiResponse/GraphiResponse";
import { useTranslations } from "next-intl";
import styles from "./graphiClientPage.module.scss";

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

const GraphiClientPage = (): React.ReactNode => {
  const t = useTranslations("GraphiQL");
  const [response, setResponse] = useState<ResponseData>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [schema, setSchema] = useState<string | null>(null);
  const [sdlError, setSDLError] = useState<string | null>(null);

  const handleFormSubmit = async (data: FormData): Promise<void> => {
    const { endpoint, query, variables, headers } = data;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers.reduce((acc: Record<string, string>, { key, value }) => {
            if (key && value) acc[key] = value;
            return acc;
          }, {}),
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
      setStatus(500);
      setResponse({ error: "Request failed" });
      if (error instanceof Error) {
        throw new Error(error.message);
      }
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
      setSchema(null);
      setSDLError("Failed to load documentation");
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  };

  return (
    <section>
      <GraphiForm
        onSubmit={handleFormSubmit}
        fetchSDL={fetchSDL}
      />
      {response && (
        <GraphiResponse
          status={status || 500}
          body={response}
        />
      )}
      {schema && (
        <section className={styles.documentation}>
          <h2>{t("documentation")}</h2>
          <pre className={styles.documentation__text}>{schema}</pre>
        </section>
      )}
      {sdlError && (
        <p>
          {" "}
          {t("documentationError")} {sdlError}
        </p>
      )}
    </section>
  );
};

export default GraphiClientPage;
