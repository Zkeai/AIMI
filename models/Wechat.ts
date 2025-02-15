import { formatDate } from "@/lib/utils";
import mongoose from "mongoose";

const newWechatSchema = new mongoose.Schema({
    coinAddress: { type: String, unique: true, required: true },
    chatroomNumber: { type: Number, default: 0 },
    userNumber: { type: Number, default: 0 },
    chatNumber: { type: Number, default: 0 },
    wxname: { type: String, default: null },
    symbol: { type: String, default: null },
    image_uri: { type: String, default: null },
    telegram: { type: String, default: null },
    twitter: { type: String, default: null },
    description: { type: String, default: null },
    website: { type: String, default: null },
    creator: { type: String, default: null },
    mc: { type: Number, default: 0 },
    open_price: { type: Number, default: 0 },
    current_price_usd: { type: Number, default: 0 },
    price_change_1h: { type: Number, default: 0 },
    volume_u_24h: { type: Number, default: 0 },
    holders: { type: Number, default: 0 },
    historyLength: { type: Number, default: 0 },
    tx_count: { type: Number, default: 0 },
    createdAt: {
        type: String,
        default: () => Date.now() + 8 * 60 * 60 * 1000
    },
    updatedAt: {
        type: String,
        default: () => Date.now() + 8 * 60 * 60 * 1000
    },

})

export const Wechat = mongoose.models?.Wechat || mongoose.model('Wechat', newWechatSchema);