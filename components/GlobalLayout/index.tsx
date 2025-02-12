"use client";

import GlobalFooter from "@/components/GlobalFooter"; // 底部版权
import GlobalHeader from "@/components/GlobalHeader"; // 头部布局

type GlobalLayoutProps = {
  children: React.ReactNode;
};

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <>
      <header className="sticky top-0 z-10 w-full  ">
        <GlobalHeader />
      </header>

      <main className="min-h-[calc(100vh-104px)]">{children}</main>

      <footer className="sticky bottom-0 w-full h-10 shadow-md">
        <GlobalFooter />
      </footer>
    </>
  );
}
