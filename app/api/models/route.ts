import { NextResponse } from 'next/server';
import { fetchModels, fetchModelById } from '@/services/tomApi';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const modelId = searchParams.get('modelId');

    try {
        const data = modelId ? await fetchModelById(modelId) : await fetchModels();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
    }
}