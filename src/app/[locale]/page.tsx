"use client";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";

const RootPage = (): React.ReactNode => {
  const t = useTranslations("Main");
  const { username } = useAuth();

  if (!username) {
    return <h1>{t("welcome")}</h1>;
  }

  return (
    <h1>
      {t("welcome-back")}, {username}
    </h1>
  );
};

export default RootPage;
