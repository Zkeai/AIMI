import { getPumpCoinInfoByMint } from '@/common/pump';

import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {

    const mint = req.nextUrl.searchParams.get('token')

    if (!mint) {
        return NextResponse.json({ success: false, error: 'token is required' }, { status: 400 });
    }


    try {

        const res = await getPumpCoinInfoByMint(mint);

        return NextResponse.json({ success: true, data: res }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}
