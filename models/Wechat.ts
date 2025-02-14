import mongoose from "mongoose";

const newWechatSchema = new mongoose.Schema({
    coinAddress: { type: String, unique: true, required: true },
    chatroomNumber: { type: Number, default: 0 },
    userNumber: { type: Number, default: 0 },
    chatNumber: { type: Number, default: 0 },

})

export const Wechat = mongoose.models?.Wechat || mongoose.model('Wechat', newWechatSchema);