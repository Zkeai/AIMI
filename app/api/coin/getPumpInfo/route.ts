
import { getPumpCoinInfoByAve } from '@/common/ave';


import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {

    const address = req.nextUrl.searchParams.get('token')

    if (!address) {
        return NextResponse.json({ success: false, error: 'address is required' }, { status: 400 });

    }
    console.log(address)
    try {
        const res = await getPumpCoinInfoByAve(address);
        const parsedData = JSON.parse(res.data);
        return NextResponse.json({ success: true, data: parsedData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}
