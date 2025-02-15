import { useEffect, useState, useRef } from "react";

export const useWebSocket = (url: string, activePage: string) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef<WebSocket | null>(null);
    const reconnectInterval = useRef<NodeJS.Timeout | null>(null);
    const reconnectDelay = 5000;

    // 连接 WebSocket
    const connectWebSocket = () => {
        if (ws.current) {
            ws.current.close(); // 关闭现有的 WebSocket 连接
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
                const data = JSON.parse(event.data); // 解析消息

                if (data.type === "newPump") {
                    const newData = Array.isArray(data.data) ? data.data : [data.data]; // 确保 newData 是一个数组


                    // 保证新的消息不会覆盖旧的消息
                    setMessages((prevMessages) => [...prevMessages, ...newData]);
                } else if (data.update) {
                    setMessages([]); // 清空消息
                } else {
                    console.warn("未知的消息类型:", data.type); // 可扩展更多类型
                }
            } catch (error) {
                console.error("❌ 处理 WebSocket 消息时出错:", error); // 错误处理
            }
        };

        ws.current.onclose = () => {
            setIsConnected(false);
            if (activePage === "pump") {
                setMessages([]);  // 离开 pump 页面时清空消息
            }
        };
    };

    useEffect(() => {
        connectWebSocket();
        return () => {
            if (ws.current) {
                ws.current.close(); // 离开页面时关闭 WebSocket
            }
            if (reconnectInterval.current) {
                clearInterval(reconnectInterval.current); // 清除重连定时器
            }
        };
    }, [url, activePage]);

    return { messages, isConnected };
};