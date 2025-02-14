import { AddWechatInfo, GetWechatInfo, UpdateWechatInfo } from '@/services/wechat';

import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { ca, ...params } = body;


        if (!ca) {
            return NextResponse.json({ success: false, error: 'coinAddress is required' }, { status: 400 });
        }

        const res = await UpdateWechatInfo(ca, params)



        return NextResponse.json({ success: true, data: res }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}
