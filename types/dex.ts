export interface Token {
    address: string;
    name: string;
    symbol: string;
}

export interface Txns {
    m5: {
        buys: number;
        sells: number;
    };
    h1: {
        buys: number;
        sells: number;
    };
    h6: {
        buys: number;
        sells: number;
    };
    h24: {
        buys: number;
        sells: number;
    };
}

export interface Volume {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
}

export interface PriceChange {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
}

export interface Liquidity {
    usd: number;
    base: number;
    quote: number;
}

export interface Info {
    imageUrl: string;
    header: string;
    openGraph: string;
    websites: {
        label: string;
        url: string;
    }[];
    socials: {
        type: string;
        url: string;
    }[];
}

export interface PumpDetailByDexScreener {
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    baseToken: Token;
    quoteToken: Token;
    priceNative: string;
    priceUsd: string;
    txns: Txns;
    volume: Volume;
    priceChange: PriceChange;
    liquidity: Liquidity;
    fdv: number;
    marketCap: number;
    pairCreatedAt: number;
    info: Info;
}

export interface DexScreenerNewCoinInfo {
    devAddress: string,
    mintAddress: string,
    historyLength: number,
    symbol: string,
    image: string,
    twitter: string | null,
    lq: string,
    sell_5m: number,
    buy_5m: number,
    website: string | null,
    discord: string | null,
    volume_1h: string,
    telegram: string | null,
    percent1h: number
}
