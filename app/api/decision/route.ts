import { NextResponse } from 'next/server';
import { fetchDecision } from '@/services/tomApi';

export async function POST(req: Request) {
    try {
        const { modelId, inputData } = await req.json();

        if (!modelId || !inputData) {
            return NextResponse.json({ error: 'Model ID and input data are required' }, { status: 400 });
        }

        // Fetch decision from TOM API
        const decision = await fetchDecision(modelId, inputData);

        return NextResponse.json(decision);
    } catch (error) {
        console.error('Failed to fetch decision:', error);
        return NextResponse.json({ error: 'Failed to fetch decision' }, { status: 500 });
    }
}