import { getPumpCoinInfoByMint, getPumpHistory } from '@/common/pump';
import { Volume } from './../types/dex';
import { getPumpCoinInfoByAve } from "@/common/ave";
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
export async function getWechatDataByPage(page = 1, limit = 10) {
    try {
        await connectDB();


        const skip = (page - 1) * limit;
        const wechatData = await Wechat.find()
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 })

        return wechatData;
    } catch (error) {
        console.error("Error fetching WeChat data:", error);
        return "error";
    }
}
export async function getAllWechatData() {
    try {
        await connectDB();
        // 获取所有数据，不进行分页
        const allWechatData = await Wechat.find().sort({ updatedAt: -1 });
        return allWechatData;
    } catch (error) {
        console.error("Error fetching all WeChat data:", error);
        return "error";
    }
}
export async function AddOrUpdateWechatInfo(ca: string, wxname: string, params: IUpdateWechatParams) {

    try {
        await connectDB();
        const havePg = await Wechat.findOne({ coinAddress: ca })

        //先查询
        const coinInfo = await getPumpCoinInfoByAve(ca);
        const parsedData = JSON.parse(coinInfo.data);


        const holders = parsedData.token.holders;
        const tx_count = parsedData.pairs[0].tx_count;
        const open_price = formatPrice(parsedData.token.open_price);
        const current_price_usd = formatPrice(parsedData.token.current_price_usd);
        const price_change_1h = parsedData.pairs[0].price_change_1h;
        const volume_u_24h = parsedData.pairs[0].volume_u_24h.toFixed(2);

        const PumpCoinInfoByMint = await getPumpCoinInfoByMint(ca);
        const symbol = PumpCoinInfoByMint.symbol;
        const image_uri = PumpCoinInfoByMint.image_uri;
        const telegram = PumpCoinInfoByMint.telegram;
        const twitter = PumpCoinInfoByMint.twitter;
        const description = PumpCoinInfoByMint.description;
        const website = PumpCoinInfoByMint.website;
        const creator = PumpCoinInfoByMint.creator;
        const mc = PumpCoinInfoByMint.usd_market_cap.toFixed(2);

        const historyLength = await getPumpHistory(creator);


        const { user, chat, chatroom } = params;

        if (havePg) {
            // 更新
            if (user === true) havePg.userNumber = havePg.userNumber + 1;
            if (chat === true) havePg.chatNumber = havePg.chatNumber + 1;
            if (chatroom === true) havePg.chatroomNumber = havePg.chatroomNumber + 1;
            havePg.updatedAt = Date.now() + 8 * 60 * 60 * 1000
            havePg.symbol = symbol
            havePg.image_uri = image_uri
            havePg.telegram = telegram
            havePg.twitter = twitter
            havePg.description = description
            havePg.website = website
            havePg.creator = creator
            havePg.mc = mc
            havePg.open_price = open_price
            havePg.current_price_usd = current_price_usd
            havePg.price_change_1h = price_change_1h
            havePg.volume_u_24h = volume_u_24h
            havePg.holders = holders
            havePg.historyLength = historyLength
            havePg.tx_count = tx_count
            havePg.wxname = wxname
            await havePg.save()
            return havePg
        }

        await Wechat.create({ coinAddress: ca, wxname: wxname, symbol, image_uri, telegram, twitter, description, website, creator, mc, open_price, current_price_usd, price_change_1h, volume_u_24h, holders, historyLength, tx_count, userNumber: user, chatNumber: chat, chatroomNumber: chatroom })


        const haveNewPg = await Wechat.findOne({ coinAddress: ca })
        if (!haveNewPg) {
            return "Wechat create and update error"
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
        return "Coin not found"
    }
    // 解构参数
    const { user, chat, chatroom } = params;


    if (user === true) wechat.userNumber = wechat.userNumber + 1;
    if (chat === true) wechat.chatNumber = wechat.chatNumber + 1;
    if (chatroom === true) wechat.chatroomNumber = wechat.chatroomNumber + 1;

    wechat.updatedAt = Date.now() + 8 * 60 * 60 * 1000



    const updatedWechat = await wechat.save()
    return updatedWechat
}

function extractTwitterUsername(appendix: string): string | null {
    try {
        // 解析 JSON 字符串
        const parsedAppendix = JSON.parse(appendix);

        // 检查是否有 twitter 字段
        if (parsedAppendix.twitter) {
            const twitterUrl = parsedAppendix.twitter;

            // 使用正则表达式提取 twitter 用户名
            const match = twitterUrl.match(/https:\/\/x\.com\/([^/]+)/);
            if (match) {
                return match[1]; // 返回用户名
            }
        }

        // 如果没有找到有效的 twitter URL，返回 null
        return null;
    } catch (error) {
        console.error("Error parsing appendix:", error);
        return null; // 解析失败时返回 null
    }
}



function formatPrice(price: number): string {
    if (price > 0) {
        // 如果价格大于 0，保留 2 位小数
        return price.toFixed(2);
    } else {
        // 如果价格小于等于 0，保留尽可能多的小数位（不舍弃）
        return price.toString();
    }
}