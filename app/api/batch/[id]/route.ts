import { NextResponse } from 'next/server';
import { fetchBatchDecisions } from '@/services/tomApi';
import connectToDatabase from '@/lib/mongodb';
import Decision from '@/models/Decision';

export async function POST(req: Request) {
    await connectToDatabase();

    const modelId = req.url.split('/').pop();
    const { inputBatch } = await req.json();

    if (!modelId || !inputBatch) {
        return NextResponse.json({ error: 'Model ID and input batch are required' }, { status: 400 });
    }

    try {
        const decisions = await fetchBatchDecisions(modelId, inputBatch);

        // Save batch decisions to MongoDB
        const decisionDocuments = decisions.map((decision: any) => ({
            modelId,
            inputData: decision.inputData,
            decision: decision.decision,
        }));
        await Decision.insertMany(decisionDocuments);

        return NextResponse.json(decisions);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch batch decisions' }, { status: 500 });
    }
}