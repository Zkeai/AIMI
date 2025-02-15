

import { getWechatDataByPage } from '@/services/wechat';


import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    const { page, limit } = await req.json();

    try {
        const res = await getWechatDataByPage(page, limit);

        return NextResponse.json({ success: true, data: res }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}
