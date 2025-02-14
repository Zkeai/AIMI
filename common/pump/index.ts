import { PumpCoinInfo } from "@/types"

export const getPumpHistory = async (devAddress: string) => {
    const res = await fetch(`https://frontend-api-v3.pump.fun/balances/${devAddress}?limit=50&offset=0&minBalance=-1`)
    const data = await res.json()
    return data.length
}
export const getPumpCoinInfo = async (address: string) => {
    const res = await fetch(`https://pump.mypinata.cloud/ipfs/${address}`)
    const data = await res.json()
    return data
}

export const getPumpCoinInfoByMint = async (tokenAddress: string) => {

    const res = await fetch(`https://frontend-api-v3.pump.fun/coins/${tokenAddress}`)
    const data: PumpCoinInfo = await res.json()
    return data
}


