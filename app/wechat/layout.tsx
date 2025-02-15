"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { useTranslations } from "next-intl";
import Discussion from "./discussion/page";
import Statistics from "./statistics/page";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("discussion"); // 管理当前选中的标签
  const t = useTranslations("Wechat");

  return (
    <div className="p-6">
      <div className="mb-4">
        <Tabs
          aria-label="Tabs sizes"
          size="sm"
          selectedKey={activeTab} // 使用 selectedKey 来管理当前选中的 tab
          onSelectionChange={(key) => setActiveTab(key as string)} // 更新 activeTab
        >
          <Tab key="discussion" title={t("hotDiscussion")} />
          <Tab key="statistics" title={t("statistics")} />
        </Tabs>
      </div>

      {/* 根据 activeTab 显示对应的内容 */}
      {activeTab === "discussion" && <Discussion />}
      {activeTab === "statistics" && <Statistics />}
    </div>
  );
};

export default Layout;
