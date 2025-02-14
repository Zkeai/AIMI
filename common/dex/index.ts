

import { PumpDetailByDexScreener } from "@/types/index";




export async function getPumpDetailByDexScreener(addr: string): Promise<PumpDetailByDexScreener | null> {
    try {
        const url = `https://api.dexscreener.com/latest/dex/tokens/${addr}`;

        const res = await fetch(url);
        const data = await res.json();
        console.log(data)



        return data?.pairs[0];
    } catch (error) {
        console.error("Puppeteer error:", error);
        return null;
    }
}