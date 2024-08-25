const BASE_URL = process.env.TOM_API_BASE_URL;
const TOM_API_KEY = process.env.TOM_API_KEY as string;



export async function fetchModelById(modelId: string) {
  const response = await fetch(`${BASE_URL}/models/${modelId}`, {
    headers: {
      'Authorization': `Bearer ${TOM_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch model metadata');
  }

  return response.json();
}
export async function fetchModels() {
    const response = await fetch(`${BASE_URL}/models/`, {
      headers: {
        'Authorization': `Bearer ${TOM_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch model metadata');
    }
  
    return response.json();
  }

export async function fetchDecision(modelId: string, inputData: any) {
    const response = await fetch(`${BASE_URL}/decision/${modelId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TOM_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputData }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch decision');
    }

    return response.json();
}

export async function fetchBatchDecisions(modelId: string, inputBatch: any[]) {
    const response = await fetch(`${BASE_URL}/batch/decision/${modelId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TOM_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: inputBatch }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch batch decisions');
    }

    return response.json();
}