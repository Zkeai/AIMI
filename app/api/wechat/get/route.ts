import { AddWechatInfo, GetWechatInfo } from '@/services/wechat';

import { NextResponse } from 'next/server';


export async function POST(req: Request) {


    try {
        const { ca }: { ca: string } = await req.json()
        if (!ca) {
            return NextResponse.json({ success: false, error: 'coinAddress is required' }, { status: 400 });
        }

        const res = await GetWechatInfo(ca)



        return NextResponse.json({ success: true, data: res }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}
