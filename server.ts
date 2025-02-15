import { createServer, IncomingMessage, Server } from "http";
import next from "next";
import { Socket } from "net";
import WebSocket from "ws";
import { solanaListener } from "@/common/pump/listenPumpCreateCoin"; // 引入你已经实现的监听器
import { wechatListener } from "./common/wechat/listenWechat";


// 初始化 WebSocket 服务器
const wss = new WebSocket.Server({ noServer: true });

// 存储不同路径的 WebSocket 客户端连接池
const clients = {
    "/ws/pump": new Set<WebSocket>(),  // 管理 /ws/pump 页面的客户端连接
    "/ws/wechat": new Set<WebSocket>(), // 管理 /ws/wechat 页面的客户端连接
};

let activePumpConnections = 0; // 记录 /ws/pump 页面活跃的连接数
let activeWechatConnections = 0; // 记录 /ws/wechat 页面活跃的连接数

// 启动 Next.js 应用
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => handle(req, res)) as Server;

    // 处理 WebSocket 升级请求
    server.on("upgrade", (request: IncomingMessage, socket: Socket, head: Buffer) => {
        // 根据请求的路径，处理不同的 WebSocket 连接
        if (request.url === "/ws/pump" || request.url === "/ws/wechat") {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit("connection", ws, request);
            });
        } else {
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
            socket.destroy();
        }
    });

    // 启动服务器
    server.listen(3000, () => {
        console.log("🚀 服务器运行在 http://localhost:3000");
    });
    // 将 WebSocket 服务器实例暴露
    (server as any).wss = wss;

    wss.on("connection", (ws, request) => {
        // 根据请求路径，管理 WebSocket 连接
        if (request.url === "/ws/pump") {
            clients["/ws/pump"].add(ws);
            activePumpConnections++;
        } else if (request.url === "/ws/wechat") {
            clients["/ws/wechat"].add(ws);
            activeWechatConnections++;
        }

        ws.on("close", () => {
            if (request.url === "/ws/pump") {
                clients["/ws/pump"].delete(ws);
                activePumpConnections--;
                if (activePumpConnections === 0) {
                    solanaListener.stopListening(); // 没有活跃的连接时停止监听
                }
            } else if (request.url === "/ws/wechat") {
                clients["/ws/wechat"].delete(ws);
                activeWechatConnections--;
                if (activeWechatConnections === 0) {
                    wechatListener.stopListening(); // 没有活跃的连接时停止监听
                }
            }
        });

        // 根据活跃连接数，启动相应的监听器
        if (activePumpConnections > 0 && !solanaListener.isListening) {
            solanaListener.setWebSocketServer(wss);
            solanaListener.startListening();
        } else if (activeWechatConnections > 0 && !wechatListener.isListening) {
            wechatListener.setWebSocketServer(wss);
            wechatListener.startListening();
        }
    });

});