'use client'

import { useEffect, useState } from "react";


export default function Home() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    async function fetchModels() {
      const response = await fetch('/api/models');
      const data = await response.json();
      setModels(data.data);
    }

    fetchModels();
  }, []);

  console.log(models)

  return (
    <div>
      <h1 className="text-2xl font-bold">Select a Model</h1>
      <ul>
        {models?.map((model: any) => (
          <li key={model.id}>{model.attributes.name}</li>
        ))}
      </ul>
    </div>
  );
}
