import { NextResponse } from 'next/server';
import { fetchDecision } from '@/services/tomApi';

export async function POST(req: Request) {
    const url = new URL(req.url);
    const modelId = url.searchParams.get('modelId');

    if (!modelId) {
        return NextResponse.json({ error: 'Model ID is required' }, { status: 400 });
    }

    const { inputData } = await req.json();

    try {
        const data = await fetchDecision(modelId, inputData);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch decision' }, { status: 500 });
    }
}