"use client";

import React, { useState } from "react";
import GraphiForm from "@/components/graphiForm/GraphiForm";
import GraphiResponse from "@/components/graphiResponse/GraphiResponse";

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
  const [response, setResponse] = useState<ResponseData>(null);
  const [status, setStatus] = useState<number | null>(null);

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus(500);
      setResponse({ error: "Request failed" });
    }
  };

  return (
    <section>
      <GraphiForm onSubmit={handleFormSubmit} />
      {response && (
        <GraphiResponse
          status={status || 500}
          body={response}
        />
      )}
    </section>
  );
};

export default GraphiClientPage;
