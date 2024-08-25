'use client'

import { DecisionData, ModelData } from '@/utils/Types';
import { useState, useEffect } from 'react';
import ModelSelectOption from '@/components/ModelSelectOption';
import DecisionModal from '@/components/DecisionModal';
import AttributeInput from '@/components/AttributeInput';

function HomePage() {
  const [model, setSelectedModel] = useState<ModelData | null>(null);
  const [inputData, setInputData] = useState<any>({});
  const [decision, setDecision] = useState<DecisionData | null>(null);
  const [models, setModels] = useState<ModelData[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false)

  useEffect(() => {
    async function loadModels() {
      try {
        const response = await fetch('/api/models');
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setModels(data.data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Failed to load models:', error);
      }
    }
    loadModels();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (model?.id) {
      setLoading(true);
      try {
        const formattedInputData = {
          data: {
            type: "scenario",
            attributes: {
              input: inputData
            }
          }
        };

        const response = await fetch('/api/decision', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ modelId: model.id, inputData: formattedInputData }),
        });

        const data = await response.json();
        setDecision(data);
      } catch (error) {
        console.error('Failed to fetch decision:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleModelChange = (selectedModelId: string) => {
    if (selectedModelId === '') {
      setSelectedModel(null);
    } else {
      const selectedModel = models.find((model) => model.id === selectedModelId);
      if (selectedModel) {
        setSelectedModel(selectedModel);
      }
    }
  };

  const handleSaveToDatabase = async () => {
    setIsSaveLoading(true);
    try {
      const response = await fetch('/api/save-decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision }),
      });

      if (response.ok) {
        console.log('Decision saved successfully');
      } else {
        console.error('Failed to save decision');
      }
    } catch (error) {
      console.error('Failed to save decision:', error);
    } finally {
      setDecision(null)
      setIsSaveLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select a Model and Input Data</h1>
      <select
        className="mb-4 p-2 border"
        onChange={(e) => handleModelChange(e.target.value)}
      >
        <option value="">Select a model...</option>
        {models.length > 0 ? (
          models.map((model) => (
            <ModelSelectOption
              key={model.id}
              modelId={model.id}
              modelName={model.attributes.name}
              selectedModelId={model?.id || ''}
              onSelectModel={() => handleModelChange(model.id)}
            />
          ))
        ) : (
          <option>No models available</option>
        )}
      </select>

      {model && (
        <form onSubmit={handleSubmit} className="mb-4">
          {model.attributes.metadata.attributes.map((variable: any) => (
            <AttributeInput
              key={variable.name}
              attribute={variable}
              onChange={handleChange}
            />
          ))}
          <div className='mt-4'>
            {loading ? <>
              <div className="flex justify-start items-center">
                <div className="spinner border-4 border-t-4 border-blue-500 border-opacity-25 rounded-full w-8 h-8 animate-spin"></div>
              </div></> :
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>}
          </div>
        </form>
      )}

      {decision && (
        <DecisionModal
          decision={decision}
          closeModal={() => setDecision(null)}
          onSave={handleSaveToDatabase}
          loading={isSaveLoading}
        />
      )}
    </div>
  );
}

export default HomePage;