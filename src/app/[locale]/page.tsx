import { useTranslations } from "next-intl";
const RootPage = (): React.ReactNode => {
  const t = useTranslations("Main");
  return <h2>{t("welcome")}</h2>;
};

export default RootPage;
