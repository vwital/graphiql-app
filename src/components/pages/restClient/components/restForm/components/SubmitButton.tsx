"use client ";

import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  className,
}: {
  className: string;
}): React.ReactNode => {
  const t = useTranslations("RestClientPage");
  const { pending } = useFormStatus();
  return (
    <button
      className={className}
      disabled={pending}
    >
      {pending ? t("sending") : t("send")}
    </button>
  );
};

export default SubmitButton;
