import { IAuthorInfo } from "@/interfaces/interfaces";
import { useTranslations } from "next-intl";

export const viwtal = (): IAuthorInfo => {
  const t = useTranslations("Vwital");
  return {
    nickname: "vwital",
    name: t("name"),
    role: t("role"),
    bio: t("bio"),
    github: "https://github.com/vwital",
  };
};

export const panakir = (): IAuthorInfo => {
  const t = useTranslations("Panakir");
  return {
    nickname: "panakir",
    name: t("name"),
    role: t("role"),
    bio: t("bio"),
    github: "https://github.com/panakir",
  };
};

export const dzehil02 = (): IAuthorInfo => {
  const t = useTranslations("Dzehil02");
  return {
    nickname: "dzehil02",
    name: t("name"),
    role: t("role"),
    bio: t("bio"),
    github: "https://github.com/dzehil02",
  };
};
