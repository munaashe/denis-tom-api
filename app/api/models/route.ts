import { NextResponse } from 'next/server';
import { fetchModels} from '@/services/tomApi';

export async function GET() {
    try {
        const models = await fetchModels();
        return NextResponse.json(models);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch model metadata' }, { status: 500 });
    }
}