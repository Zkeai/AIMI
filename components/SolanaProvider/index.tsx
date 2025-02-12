"use client";

import { solanaWeb3JsAdapter, projectId, networks } from "@/config/appkit";
import { createAppKit } from "@reown/appkit/react";
import React, { useEffect, type ReactNode } from "react";
import { useThemeStore } from "@/store/useTheme";
import { DefaultSIWX } from "@reown/appkit-siwx";
// Set up metadata
const metadata = {
  name: process.env.NEXT_PUBLIC_PROJECT_NAME,
  description: process.env.NEXT_PUBLIC_PROJECT_DESCRIPTION,
  url: "https://aimi.muyuai.top",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 创建 modal 实例（初始主题模式不重要，稍后会更新）
export const modal = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  projectId,
  networks,
  metadata,
  themeMode: "light", // 这里的值只是初始化，后面会用 `setThemeMode` 更新
  features: {
    email: false,
    socials: [],
    analytics: true,
    onramp: false,
  },
  enableWalletConnect: false,
  themeVariables: {
    "--w3m-accent": "#000000",
  },
  siwx: new DefaultSIWX(),
});

function ContextProvider({ children }: { children: ReactNode }) {
  const themeMode = useThemeStore((state) => state.themeMode);

  useEffect(() => {
    if (modal && modal.setThemeMode) {
      modal.setThemeMode(themeMode); // 动态更新 themeMode
    }
  }, [themeMode]);

  return <>{children}</>;
}

export default ContextProvider;
