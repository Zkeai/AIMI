import { PumpDetail } from "@/types/index";




export async function getPumpDetail(addr: string): Promise<PumpDetail | null> {
    try {
        const url = `https://gmgn.ai/_next/data/nVVbQMQ7NG3pcNQYxV0Gs/sol/token/${addr}.json?chain=sol&token=${addr}`;

        const res = await fetch(url);
        const data = await res.json();



        return JSON.parse(data);
    } catch (error) {
        console.error("Puppeteer error:", error);
        return null;
    }
}