'use client';
import { useState, useEffect } from 'react';

function HomePage() {
  const [model, setModel] = useState<any>(null);
  const [inputData, setInputData] = useState<any>({});
  const [decision, setDecision] = useState<any>(null);
  const [models, setModels] = useState<any[]>([]); // Ensure models is an array

  useEffect(() => {
    async function loadModels() {
      try {
        const response = await fetch('/api/models');
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setModels(data.data); // Ensure that models is an array
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Failed to load models:', error);
      }
    }
    loadModels();
  }, []);

  console.log(models);

  const handleModelChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelId = e.target.value;
    if (modelId) {
      try {
        const response = await fetch(`/api/models/${modelId}`);
        const data = await response.json();
        setModel(data.data); // Accessing data as required
      } catch (error) {
        console.error('Failed to load model details:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (model?.id) {
      try {
        const response = await fetch(`/api/decision/${model.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inputData }),
        });
        const data = await response.json();
        setDecision(data);
      } catch (error) {
        console.error('Failed to fetch decision:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select a Model and Input Data</h1>
      <select onChange={handleModelChange} className="mb-4 p-2 border">
        <option>Select a model...</option>
        {models.length > 0 ? (
          models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.attributes.name}
            </option>
          ))
        ) : (
          <option>No models available</option>
        )}
      </select>

      {model && (
        <form onSubmit={handleSubmit} className="mb-4">
          {model.attributes.metadata.attributes.map((variable: any) => (
            <div key={variable.name} className="mb-2">
              <label className="block">{variable.question}</label>
              <input
                name={variable.name}
                type={variable.type === 'Continuous' ? 'number' : 'text'}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      )}

      {decision && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Decision</h2>
          <p>{decision.decision}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;