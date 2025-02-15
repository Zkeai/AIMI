

import { getAllWechatData } from '@/services/wechat';


import { NextResponse } from 'next/server';


export async function GET() {

    try {
        const res = await getAllWechatData();

        return NextResponse.json({ success: true, data: res }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}
