import { useTranslations } from "next-intl";

const Header = (): React.ReactNode => {
  const t = useTranslations("Header");
  return <header>{t("Hello")}</header>;
};

export default Header;
