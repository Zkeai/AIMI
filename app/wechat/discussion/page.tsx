"use client";
import { useWebSocket } from "@/hooks/useWebSocket";
import React, { useEffect, useState } from "react";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { ErrorBoundary } from "react-error-boundary";
import { TwitterIcon, Globe, Github } from "lucide-react";
import { useTranslations } from "next-intl";

const Discussion = () => {
  const t = useTranslations("Wechat");

  const columns = [
    { label: t("wechatInfo"), key: "chatInfo" },
    { label: t("symbol"), key: "symbol" },
    { label: t("coinAddress"), key: "coinAddress" },
    { label: t("social"), key: "social" },
    { label: t("wxname"), key: "wxname" },
    { label: t("mc"), key: "mc" },
    { label: t("openPrice"), key: "open_price" },
    { label: t("currentPrice"), key: "current_price_usd" },
    { label: t("priceChange"), key: "price_change_1h" },
    { label: t("volume"), key: "volume_u_24h" },
    { label: t("holders"), key: "holders" },
    { label: t("historyLength"), key: "historyLength" },
    { label: t("txCount"), key: "tx_count" },
    { label: t("updatedAt"), key: "updatedAt" },
  ];

  const [messageData, setMessageData] = useState<any[]>([]);
  const { messages, isConnected } = useWebSocket(
    "ws://localhost:3000/ws/wechat",
    "wechat"
  );

  const rows = messageData;

  // 获取数据函数
  const getWechatDate = async () => {
    try {
      const res = await fetch("/api/coin/getPumpByPage", {
        method: "POST",
        body: JSON.stringify({ page: 1, limit: 10 }),
      });
      const data = await res.json();
      if (data?.data instanceof Array) {
        setMessageData(data?.data || []); // 确保 data 是一个数组
      }
    } catch (error) {
      console.error("获取数据失败:", error);
      setMessageData([]); // 数据获取失败时，设置为空数组
    }
  };

  const formatCoinAddress = (address: string) => {
    if (address.length > 9) {
      return address.slice(0, 5) + "..." + address.slice(-4);
    }
    return address; // Return the full address if it's short enough
  };

  // 组件加载时获取数据
  useEffect(() => {
    getWechatDate();
  }, []);

  // WebSocket 消息到来时更新数据
  useEffect(() => {
    if (isConnected && messages) {
      getWechatDate();
    }
  }, [messages, isConnected]);

  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => <div>Error: {error.message}</div>}
    >
      <div className="max-h-[71vh] min-h-[71vh] overflow-y-auto">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item._id}>
                {/* Render Chat Info */}
                <TableCell>
                  <div className="flex min-w-[200px]">
                    <span className="bg-teal-100 text-orange-500 p-1.5 rounded-md mr-2">
                      {item.chatroomNumber}个群
                    </span>
                    <span className="bg-green-100 text-blue-500 p-1.5 rounded-md mr-2">
                      {item.userNumber}个人
                    </span>
                    <span className="bg-red-100 text-red-500 p-1.5 rounded-md">
                      {item.chatNumber}次
                    </span>
                  </div>
                </TableCell>

                {/* Render other columns */}
                <TableCell>{getKeyValue(item, "symbol")}</TableCell>
                <TableCell>
                  <a
                    href={`https://gmgn.ai/sol/token/${getKeyValue(item, "coinAddress")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {formatCoinAddress(getKeyValue(item, "coinAddress"))}
                  </a>
                </TableCell>

                <TableCell>
                  <div className="flex space-x-2">
                    {item.twitter && (
                      <a
                        href={item.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <TwitterIcon size={20} />
                      </a>
                    )}
                    {item.website && (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Globe size={20} />
                      </a>
                    )}
                    {item.telegram && (
                      <a
                        href={item.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>{getKeyValue(item, "wxname")}</TableCell>
                <TableCell>{getKeyValue(item, "mc")}</TableCell>
                <TableCell>{getKeyValue(item, "open_price")}</TableCell>
                <TableCell>{getKeyValue(item, "current_price_usd")}</TableCell>
                <TableCell>{getKeyValue(item, "price_change_1h")}%</TableCell>
                <TableCell>{getKeyValue(item, "volume_u_24h")}</TableCell>
                <TableCell>{getKeyValue(item, "holders")}</TableCell>
                <TableCell>{getKeyValue(item, "historyLength")}</TableCell>
                <TableCell>{getKeyValue(item, "tx_count")}</TableCell>
                <TableCell>{getKeyValue(item, "updatedAt")}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </ErrorBoundary>
  );
};

export default Discussion;
