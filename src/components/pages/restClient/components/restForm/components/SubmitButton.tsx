"use client ";

import { useTranslations } from "next-intl";
import { usePathname } from "@/navigation";
import { useFormStatus } from "react-dom";
import { useParams } from "next/navigation";
import { convertFromBase64 } from "@/utils/convertBase64";

const SubmitButton = ({
  className,
}: {
  className: string;
}): React.ReactNode => {
  const t = useTranslations("RestClientPage");
  const { pending } = useFormStatus();
  const pathname = usePathname();
  const urlParams = useParams();

  const generateDataForHistory = (): string => {
    return JSON.stringify({
      url: convertFromBase64(urlParams.requestUrl[0]),
      method: urlParams.method,
      href: pathname,
    });
  };

  const handleSubmitButton = (): void => {
    const data = generateDataForHistory();
    const id = `history-${Date.now().toString()}`;
    localStorage.setItem(id, data);
  };

  return (
    <button
      className={className}
      disabled={pending}
      onClick={handleSubmitButton}
    >
      {pending ? t("sending") : t("send")}
    </button>
  );
};

export default SubmitButton;
