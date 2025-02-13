export interface DebotCoinInfo {
    code: number;
    description: string;
    data: {
        market: any
        coin: {
            liquidity: number;
            fdv: number;
            mkt_cap: number;
            holders: number;
            percent1m: number;
            percent5m: number;
            percent1h: number;
            percent12h: number;
            percent24h: number;
            volume_1minutes: number;
            volume_5minutes: number;
            volume_1h: number;
            volume_6h: number;
            volume_12h: number;
            volume_24h: number;
            lastUpdateTime: number;
        }
        dev: {
            developer: string;
            first_buy_amount: number;
            first_trans_in_amount: number;
            buy_amount: number;
            sell_amount: number;
            trans_out_amount: number;
            trans_in_amount: number;
            position: number;
            position_increase: boolean;
            position_decrease: boolean;
            position_clear: boolean;
            transactions: any[];
            next: string;
        }
    }
}

export interface DebotNewCoinInfo {
    devAddress: string;
    mintAddress: string;
    historyLength: number;
    symbol: string;
    name: string;
    image: string;
    twitter: string | undefined;
    holder: number;
    mkt_cap: number;
    volume_1h: number;
    dev_position_clear: boolean;
    percent1h: number;
}
