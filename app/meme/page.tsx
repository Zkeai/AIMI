"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { Card, CardBody } from "@heroui/card";
import {
  Copy,
  SlidersHorizontal,
  Radio,
  ShoppingCart,
  Globe,
  GitlabIcon,
} from "lucide-react";
import { GithubIcon, TwitterIcon } from "@/components/GlobalIcons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PumpCoinInfoResponse } from "@/types";

// WebSocket 状态管理
const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<PumpCoinInfoResponse[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const reconnectInterval = useRef<NodeJS.Timeout | null>(null);
  const reconnectDelay = 5000; // 5秒重连

  const connectWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.close(); // 关闭当前 WebSocket 连接
    }

    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setIsConnected(true);
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current); // 清除重连定时器
        reconnectInterval.current = null;
      }
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [data, ...prev]); // 将新数据插入前面
      } catch (error) {
        console.error("❌ JSON 解析失败:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("❌ WebSocket 错误:", error);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      if (!reconnectInterval.current) {
        console.log(`⏳ ${reconnectDelay / 1000} 秒后尝试重连...`);
        reconnectInterval.current = setInterval(
          connectWebSocket,
          reconnectDelay
        );
      }
    };
  }, [url]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws.current) ws.current.close();
      if (reconnectInterval.current) clearInterval(reconnectInterval.current);
    };
  }, [connectWebSocket]);

  return { messages, isConnected };
};

// 复制功能
const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
};

const Meme = () => {
  const { messages, isConnected } = useWebSocket("ws://localhost:3000/ws");

  return (
    <div className="flex justify-between p-5 gap-5">
      <div className="flex-1 text-center">
        <Card>
          <CardBody>
            <div className="h-4 flex justify-between text-sm">
              <div className="flex items-center gap-2">
                🌱 新创建
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {isConnected ? (
                        <Radio className="w-4 h-4 text-green-500" />
                      ) : (
                        <Radio className="w-4 h-4 text-red-500" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {isConnected
                          ? "WebSocket 连接成功"
                          : "WebSocket 连接失败"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div>
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>
            <div className="h-[73vh] mt-5 flex flex-col px-3 py-8 space-y-3 overflow-y-auto custom-scrollbar-hide">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 rounded-lg shadow"
                >
                  {/* 左侧信息 */}
                  <div className="flex items-center gap-3">
                    {msg.image ? (
                      <img
                        src={msg.image}
                        alt={msg.symbol || "Token Image"}
                        className="w-10 h-10 rounded-full"
                        onError={(e) => (e.currentTarget.src = "/fallback.png")}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
                        📷
                      </div>
                    )}
                    <div className="flex flex-col text-left">
                      <div className="flex gap-2 items-center">
                        <div className="font-semibold text-lg">
                          {msg.symbol}
                        </div>
                        {msg.twitter && (
                          <a
                            href={msg.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter Profile"
                          >
                            <TwitterIcon
                              size={12}
                              className="cursor-pointer hover:text-blue-500"
                            />
                          </a>
                        )}

                        {msg.website && (
                          <a
                            href={msg.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="website Profile"
                          >
                            <Globe
                              size={12}
                              className="cursor-pointer hover:text-blue-500"
                            />
                          </a>
                        )}

                        {msg.telegram && (
                          <a
                            href={msg.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="telegram Profile"
                          >
                            <GithubIcon
                              size={12}
                              className="cursor-pointer hover:text-blue-500"
                            />
                          </a>
                        )}
                      </div>

                      {/* Mint 地址 */}
                      <div className="flex gap-1 items-center">
                        <div className="text-xs text-gray-500">
                          {msg.mintAddress.slice(0, 5)}...
                          {msg.mintAddress.slice(-4)}
                        </div>
                        <Copy
                          onClick={() => handleCopy(msg.mintAddress)}
                          className="w-3 h-3 text-gray-500 hover:text-blue-500 cursor-pointer"
                        />
                      </div>

                      {/* 开发者持仓信息 */}
                      {/* <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-xs text-gray-500 flex items-center cursor-pointer gap-2">
                              <ShoppingCart className="w-3 h-3 text-green-500">
                                {msg.buy_5m}
                              </ShoppingCart>
                              <ShoppingCart className="w-3 h-3 text-red-500">
                                {msg.sell_5m}
                              </ShoppingCart>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {msg.sell_5m
                                ? "5分钟内出售笔数"
                                : "5分钟内购买笔数"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider> */}
                    </div>
                  </div>

                  {/* 右侧信息 */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-1 items-center">
                      <div className="text-xs text-yellow-500">DEV</div>
                      <div className="text-xs text-gray-500">
                        {msg.devAddress.slice(0, 5)}...
                        {msg.devAddress.slice(-4)}
                      </div>
                      <Copy
                        onClick={() => handleCopy(msg.devAddress)}
                        className="w-3 h-3 text-gray-500 hover:text-blue-500 cursor-pointer"
                      />
                    </div>
                    <div className="text-sm flex items-center">
                      <span className="text-xs mr-2 text-gray-500">
                        历史发币次数
                      </span>
                      <span>{msg.historyLength}</span>
                    </div>
                    <TooltipProvider>
                      <div className="flex text-sm items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs text-gray-500 cursor-pointer">
                              MC: ${msg.mc}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>市值：${msg.mc}</p>
                          </TooltipContent>
                        </Tooltip>

                        {/* <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs text-gray-500 flex items-center cursor-pointer">
                              <Users className="w-3 h-3 mr-1" />
                              {msg.holder}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>持币地址数量：{msg.holder}</p>
                          </TooltipContent>
                        </Tooltip> */}

                        {/* <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs text-gray-500 cursor-pointer">
                              1h V: ${msg.volume_1h}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>过去 1 小时交易量：${msg.volume_1h}</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs text-gray-500 cursor-pointer">
                              1h P: {msg.percent1h}%
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>过去 1 小时涨跌幅：{msg.percent1h}%</p>
                          </TooltipContent>
                        </Tooltip> */}
                      </div>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex-1 text-center">
        <Card>
          <CardBody>
            <h1>2</h1>
          </CardBody>
        </Card>
      </div>
      <div className="flex-1 text-center">
        <Card>
          <CardBody>
            <h1>3</h1>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Meme;
