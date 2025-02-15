"use client";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Card, CardBody } from "@heroui/card";
import {
  Copy,
  SlidersHorizontal,
  GithubIcon,
  TwitterIcon,
  Globe,
} from "lucide-react";
import { PumpCoinInfoResponse } from "@/types";
import WebSocketStatusTooltip from "@/components/WebSocketStatusTooltip";

// 复制功能
const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
};

// Token信息组件
const TokenInfo = ({ msg }: { msg: PumpCoinInfoResponse }) => (
  <div
    key={msg.mintAddress}
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
          <div className="font-semibold text-lg">{msg.symbol}</div>
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
              aria-label="Website Profile"
            >
              <Globe size={12} className="cursor-pointer hover:text-blue-500" />
            </a>
          )}
          {msg.telegram && (
            <a
              href={msg.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram Profile"
            >
              <GithubIcon
                size={12}
                className="cursor-pointer hover:text-blue-500"
              />
            </a>
          )}
        </div>

        <div className="flex gap-1 items-center">
          <div className="text-xs text-gray-500">
            {msg.mintAddress.slice(0, 5)}...{msg.mintAddress.slice(-4)}
          </div>
          <Copy
            onClick={() => handleCopy(msg.mintAddress)}
            className="w-3 h-3 text-gray-500 hover:text-blue-500 cursor-pointer"
          />
        </div>
      </div>
    </div>

    {/* 右侧信息 */}
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-1 items-center">
        <div className="text-xs text-yellow-500">DEV</div>
        <div className="text-xs text-gray-500">
          {msg.devAddress.slice(0, 5)}...{msg.devAddress.slice(-4)}
        </div>
        <Copy
          onClick={() => handleCopy(msg.devAddress)}
          className="w-3 h-3 text-gray-500 hover:text-blue-500 cursor-pointer"
        />
      </div>
      <div className="text-sm flex items-center">
        <span className="text-xs mr-2 text-gray-500">历史发币次数</span>
        <span>{msg.historyLength}</span>
      </div>
      <div className="flex text-sm items-center gap-2">
        <span className="text-xs text-gray-500 cursor-pointer">
          MC: ${msg.mc}
        </span>
      </div>
    </div>
  </div>
);

const Meme = () => {
  const { messages, isConnected } = useWebSocket(
    "ws://localhost:3000/ws/pump",
    "pump"
  );

  return (
    <div className="flex justify-between p-5 gap-5">
      <div className="flex-1 text-center">
        <Card>
          <CardBody>
            <div className="h-4 flex justify-between text-sm">
              <div className="flex items-center gap-2">
                🌱 新创建
                <WebSocketStatusTooltip isConnected={isConnected} />
              </div>
              <div>
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>
            <div className="h-[73vh] mt-5 flex flex-col px-3 py-1 space-y-2 overflow-y-auto custom-scrollbar-hide">
              {messages.map((msg, index) => (
                <TokenInfo key={index} msg={msg} />
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
