import React from 'react';

interface ModelSelectOptionProps {
  modelId: string;
  modelName: string;
  selectedModelId: string;
  onSelectModel: () => void;
}

const ModelSelectOption: React.FC<ModelSelectOptionProps> = ({ modelId, modelName, selectedModelId, onSelectModel }) => {
  const isDisabled = modelId !== '58d3bcf97c6b1644db73ad12';

  return (
    <option
      value={modelId}
      onClick={!isDisabled ? onSelectModel : undefined}
      className={isDisabled ? 'text-gray-500' : 'text-black'}
      disabled={isDisabled}
    >
      {modelName}
    </option>
  );
};

export default ModelSelectOption;