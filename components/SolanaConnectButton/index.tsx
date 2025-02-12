"use client";

import { useTranslations } from "next-intl";
export const ConnectButton = () => {
  const t = useTranslations("SolanaConnectButton");

  return (
    <div>
      <appkit-button
        size="sm"
        balance="show"
        label={t("Connect")}
        loadingLabel={t("Connecting")}
      />
    </div>
  );
};
