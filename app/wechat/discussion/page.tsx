"use client";
import { useWebSocket } from "@/hooks/useWebSocket";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { AddOrUpdateWechatInfo } from "@/services/wechat";

export const columns = [
  { name: "TOKEN", uid: "token" },
  { name: "STATISTICS", uid: "statistics" },

  { name: "ACTIONS", uid: "actions" },
  { name: "UPDATE TIME", uid: "updateTime" },
];

const Discussion = () => {
  const [messageData, setMessageData] = useState<any[]>([]);
  const { messages, isConnected } = useWebSocket(
    "ws://localhost:3000/ws/wechat",
    "wechat"
  );

  const getWechatDate = async () => {
    const res = await fetch("/api/coin/getPumpByPage", {
      method: "POST",
      body: JSON.stringify({ page: 1, limit: 10 }),
    });
    const data = await res.json();
    console.log(data, "data");
    setMessageData(data.data);
  };

  useEffect(() => {
    getWechatDate();
  }, []);

  useEffect(() => {
    // 如果 WebSocket 连接成功，并且有新消息到来
    if (isConnected && messages) {
      console.log("新消息");
      getWechatDate();
    }
    console.log(messageData, "messageData");
  }, [messages, isConnected]);

  return (
    <div>
      {messageData.map((item) => (
        <div key={item.coinAddress}>{item.coinAddress}</div>
      ))}
    </div>
  );
};

export default Discussion;
