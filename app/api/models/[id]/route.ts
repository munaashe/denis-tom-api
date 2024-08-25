import { NextResponse } from 'next/server';
import { fetchModelById } from '@/services/tomApi';

export async function GET(req: Request) {
  const modelId = req.url.split('/').pop(); 

  if (!modelId) {
    return NextResponse.json({ error: 'Model ID is required' }, { status: 400 });
  }

  try {
    const model = await fetchModelById(modelId);
    return NextResponse.json(model);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch model' }, { status: 500 });
  }
}