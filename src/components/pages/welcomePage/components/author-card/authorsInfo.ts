import { IAuthorInfo } from "@/interfaces/interfaces";
import { useTranslations } from "next-intl";

const authors = (): { [key: string]: IAuthorInfo } => {
  const t = useTranslations("Author");
  return {
    vwital: {
      nickname: "vwital",
      name: t("vwitalName"),
      role: t("vwitalRole"),
      bio: t("vwitalBio"),
      github: "https://github.com/vwital",
    },
    panakir: {
      nickname: "panakir",
      name: t("panakirName"),
      role: t("panakirRole"),
      bio: t("panakirBio"),
      github: "https://github.com/panakir",
    },
    dzehil02: {
      nickname: "dzehil02",
      name: t("dzehil02Name"),
      role: t("dzehil02Role"),
      bio: t("dzehil02Bio"),
      github: "https://github.com/dzehil02",
    },
  };
};
export { authors };
