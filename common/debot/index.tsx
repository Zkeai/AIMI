import { DebotCoinInfo } from "@/types/debot";

export async function getPumpDetail(
  addr: string
): Promise<DebotCoinInfo | null> {
  try {
    const market_url = `https://debot.ai/api/market/token/info?token=${addr}&chain=solana`;
    const res_market = await fetch(market_url);
    const data_market = await res_market.json();

    const url = `https://debot.ai/api/dashboard/token/trading/stats?token=${addr}&chain=solana`;

    const res = await fetch(url);
    const data = await res.json();

    const url2 = `https://debot.ai/api/dashboard/token/dev/info?chain=solana&token=${addr}`;

    const res2 = await fetch(url2);
    const data2 = await res2.json();

    const mergedData = {
      code: 0,
      description: "success",
      data: {
        market: data_market.data,
        coin: data.data,
        dev: data2.data,
      },
    };

    return mergedData;
  } catch (error) {
    console.error("Puppeteer error:", error);
    return null;
  }
}

export const getDebotCoinInfo = async (address: string) => {
  const url = `https://debot.ai/api/market/token/info?token=${address}&chain=solana`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
};
