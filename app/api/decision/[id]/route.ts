import { NextResponse } from 'next/server';
import { fetchDecision } from '@/services/tomApi';
import connectToDatabase from '@/lib/mongodb';
import Decision from '@/models/Decision';

export async function POST(req: Request) {
  await connectToDatabase();

  const modelId = req.url.split('/').pop();
  const { inputData } = await req.json();

  if (!modelId || !inputData) {
    return NextResponse.json({ error: 'Model ID and input data are required' }, { status: 400 });
  }

  try {
    const decision = await fetchDecision(modelId, inputData);
    
    // Save decision to MongoDB
    const newDecision = new Decision({
      modelId,
      inputData,
      decision: decision.decision,
    });
    await newDecision.save();

    return NextResponse.json(decision);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch decision' }, { status: 500 });
  }
}