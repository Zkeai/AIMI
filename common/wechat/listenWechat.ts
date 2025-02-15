import connectDB from "@/lib/db";
import { EventEmitter } from "events";
import WebSocket from "ws";
import { Wechat } from "@/models/Wechat";

class WechatListener extends EventEmitter {
    public isListening: boolean = false;
    private wss: WebSocket.Server | null = null;
    private changeStream: any = null;  // 存储 changeStream 实例

    constructor() {
        super();
    }

    async startListening() {
        console.log("wechat 开始监听")
        if (this.isListening) {
            return { status: "already_listening_wechat" };
        }

        await connectDB(); // 确保在开始监听之前连接到数据库

        try {
            const changeStream = Wechat.watch([
                { $match: { 'updateDescription.updatedFields.updatedAt': { $exists: true } } }
            ]);

            this.changeStream = changeStream; // 存储 changeStream 实例

            changeStream.on("change", (change) => {

                if (change.operationType === "update") {
                    console.log("有更新")
                    const newMessage = change.updateDescription.updatedFields;


                    this.broadcast();
                }
            });

            this.isListening = true;
            return { status: "listening" };
        } catch (error: unknown) {

            return { status: "error", error: error instanceof Error ? error.message : "未知错误" };
        }
    }

    // 🔴 停止监听
    async stopListening() {
        if (!this.isListening || !this.changeStream) {
            return { status: "not_listening" };
        }

        try {
            await this.changeStream.close();
            console.log("MongoDB 监听已停止");
            this.changeStream = null;  // 清空 changeStream 实例
            this.isListening = false;
            return { status: "stopped" };
        } catch (error: unknown) {
            return { status: "error", error: error instanceof Error ? error.message : "未知错误" };
        }
    }

    /**
     * 绑定 WebSocket 服务器
     */
    setWebSocketServer(wss: WebSocket.Server) {
        this.wss = wss;
    }

    /**
     * 通过 WebSocket 发送数据
     */
    private broadcast() {
        if (!this.wss) return;


        this.wss.clients.forEach(client => {

            if (client.readyState === WebSocket.OPEN) {


                client.send(JSON.stringify({ update: true }));
            }
        });
    }
}

export const wechatListener = new WechatListener();