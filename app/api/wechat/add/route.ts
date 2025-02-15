import { AddOrUpdateWechatInfo } from '@/services/wechat';
import { IUpdateWechatParams } from '@/types';

import { NextResponse } from 'next/server';


export async function POST(req: Request) {


    try {
        const { ca, wxname, params }: { ca: string, wxname: string, params: IUpdateWechatParams } = await req.json()
        if (!ca) {
            return NextResponse.json({ success: false, error: 'coinAddress is required' }, { status: 400 });
        }

        const res = await AddOrUpdateWechatInfo(ca, wxname, params)



        return NextResponse.json({ success: true, data: res }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}
