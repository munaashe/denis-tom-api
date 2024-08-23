'use clientF'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ModelForm() {
  const router = useRouter();
  const { modelId } = router.query;
  const [model, setModel] = useState<any | null>(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function fetchModel() {
      if (modelId) {
        const response = await fetch(`/api/models?modelId=${modelId}`);
        const data = await response.json();
        setModel(data);
      }
    }

    fetchModel();
  }, [modelId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/decision?modelId=${modelId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputData: formData }),
    });
    const data = await response.json();
    console.log('Decision:', data);
  };

  if (!model) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{model.name}</h1>
      <form onSubmit={handleSubmit}>
        {model.inputVariables.map((variable: any) => (
          <div key={variable.name}>
            <label>{variable.name}</label>
            <input
              type="text"
              name={variable.name}
              onChange={handleInputChange}
              className="border p-2"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Get Decision</button>
      </form>
    </div>
  );
}