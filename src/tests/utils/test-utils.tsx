import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "../../../messages/en.json";

const locale = "en";

export const IntlProviderWrapper = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => (
  <NextIntlClientProvider
    messages={enMessages}
    locale={locale}
  >
    {children}
  </NextIntlClientProvider>
);
