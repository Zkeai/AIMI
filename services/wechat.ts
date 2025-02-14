import connectDB from "@/lib/db";
import { Wechat } from "@/models/Wechat";
import { IUpdateWechatParams } from "@/types";

export async function GetWechatInfo(ca: string) {

    try {
        await connectDB();
        const havePg = await Wechat.findOne({ coinAddress: ca })
        return havePg
    } catch (error) {
        return "error"
    }
}

export async function AddWechatInfo(ca: string) {
    try {
        await connectDB();
        const havePg = await Wechat.findOne({ coinAddress: ca })
        if (havePg) {
            return "Wechat already exists"
        }
        await Wechat.create({ coinAddress: ca })

        const haveNewPg = await Wechat.findOne({ coinAddress: ca })
        if (!haveNewPg) {
            return "Wechat create error"
        }

        return haveNewPg
    } catch (error) {
        return error
    }
}

export async function UpdateWechatInfo(ca: string, params: IUpdateWechatParams) {

    if (!ca) {
        return "coinAddress is required"
    }

    await connectDB();
    const wechat = await Wechat.findOne({ coinAddress: ca })

    if (!wechat) {
        return "Wechat not found"
    }
    // 解构参数
    const { user, chat, chatroom } = params;


    if (user === true) wechat.userNumber = wechat.userNumber + 1;
    if (chat === true) wechat.chatNumber = wechat.chatNumber + 1;
    if (chatroom === true) wechat.chatroomNumber = wechat.chatroomNumber + 1;



    const updatedWechat = await wechat.save()
    return updatedWechat
}

