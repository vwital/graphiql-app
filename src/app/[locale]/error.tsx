"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

const ErrorPage = (): React.ReactNode => {
  const t = useTranslations("ErrorPage");

  return (
    <>
      <h2>{t("errorHeader")}</h2>
      <p>{t("errorMessage")}</p>
      <button>
        <Link href={"/"}> {t("errorButton")}</Link>
      </button>
    </>
  );
};

export default ErrorPage;
