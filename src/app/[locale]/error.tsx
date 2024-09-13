"use client";
import ErrorPageLocale from "@/components/pages/errorPageLocale/ErrorPageLocale";

const ErrorPage = ({ error }: { error: Error }): JSX.Element => {
  return <ErrorPageLocale error={error} />;
};

export default ErrorPage;
