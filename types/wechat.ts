export interface IUpdateWechatParams {
    user?: boolean;
    chat?: boolean;
    chatroom?: boolean;
}

export interface IWechatToken {
    token: string;
    statistics: string;
    holders: number;
    intro_cn: string;
    intro_en: string;
    current_price_usd: number;
    risk_level: number;
    risk_score: number;
    lock_amount: number;
    burn_amount: number;
    tx_count: number;
    volume_u: number;
    lp_holders: number;
    price_change: number;
    liquiditie: number;
    updateTime: string;
}