import { useTranslations } from "next-intl";
const SignInPage = (): React.ReactNode => {
  const t = useTranslations("SignInPage");
  return <h2>{t("signIn")}</h2>;
};

export default SignInPage;
