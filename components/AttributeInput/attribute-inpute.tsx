import React from 'react';

interface Attribute {
    name: string;
    question: string;
    type: 'Continuous' | 'Discrete';
}

interface AttributeInputProps {
    attribute: Attribute;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AttributeInput: React.FC<AttributeInputProps> = ({ attribute, onChange }) => {
    return (
        <div className="mb-2">
            <label className="block">{attribute.question}</label>
            <input
                name={attribute.name}
                type={attribute.type === 'Continuous' ? 'number' : 'text'}
                onChange={onChange}
                className="p-2 border rounded w-full"
            />
        </div>
    );
};

export default AttributeInput;