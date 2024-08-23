import { useTranslations } from "next-intl";
const SingUpPage = (): React.ReactNode => {
  const t = useTranslations("SignUpPage");
  return <h2>{t("signUp")}</h2>;
};

export default SingUpPage;
