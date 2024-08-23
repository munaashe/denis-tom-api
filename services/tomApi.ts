const API_BASE_URL = process.env.TOM_API_BASE_URL;
const TOM_API_KEY = process.env.TOM_API_KEY || '';

interface Model {
    id: string;
    name: string;
    inputVariables: Array<{ name: string; type: string }>;
}

interface DecisionResponse {
    decision: string;
    details: Record<string, any>;
}

// Helper function to make API requests
async function apiRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOM_API_KEY}`,
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch from ${endpoint}: ${response.statusText}`);
    }

    return response.json();
}

// Fetch all models
export async function fetchModels(): Promise<Model[]> {
    return await apiRequest('/models');
}

// Fetch a specific model by ID
export async function fetchModelById(modelId: string): Promise<Model> {
    return await apiRequest(`/models/${modelId}`);
}

// Query a decision based on model ID and input data
export async function fetchDecision(modelId: string, inputData: Record<string, any>): Promise<DecisionResponse> {
    return await apiRequest(`/decision/${modelId}`, {
        method: 'POST',
        body: JSON.stringify(inputData),
    });
}

// Batch functionality (optional, adjust based on API specs)
export async function fetchBatchDecisions(modelId: string, inputBatch: Array<Record<string, any>>): Promise<DecisionResponse[]> {
    return await apiRequest(`/batch/${modelId}`, {
        method: 'POST',
        body: JSON.stringify(inputBatch),
    });
}