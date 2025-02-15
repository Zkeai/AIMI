import WebSocket from "ws";
import EventEmitter from "events";

// 定义一个事件发射器，用于管理监听器
class SolanaListener extends EventEmitter {
    isListening: boolean = false;

    // 启动监听
    startListening(type: "pump" | "wechat") {
        if (this.isListening) return;
        this.isListening = true;

        console.log(`开始监听 ${type} 数据`);

        // 模拟监听数据并推送
        setInterval(() => {
            this.emit(`new${type.charAt(0).toUpperCase() + type.slice(1)}`, { message: `${type} 数据` });
        }, 5000); // 每 5 秒模拟一次数据推送
    }

    // 停止监听
    stopListening(type: "pump" | "wechat") {
        this.isListening = false;
        console.log(`停止监听 ${type} 数据`);
    }
}

// 实例化监听器
const solanaListener = new SolanaListener();

// 供服务器使用
export { solanaListener };