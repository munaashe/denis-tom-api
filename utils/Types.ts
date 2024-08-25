export interface ModelData {
    type: string;
    id: string;
    attributes: Attributes;
}

export interface DecisionData {
    data: {
        attributes: {
            input: Record<string, string | number>;
            decision: string;
            meetsConfidence: boolean;
            model: string;
            timestamp: string;
            reasons: Array<{
                antecedent: {
                    index: number;
                    threshold: string | number;
                    type: string;
                };
                consequent: {
                    type: string;
                    value: string;
                };
                type: string;
            }>;
            confidence: number;
        };
        id: string;
        type: string;
    };
};

interface Attributes {
    name: string;
    description: string;
    metadata: Metadata;
    exclusions: Exclusions;
    publisher: string;
    "publish-date": string;
    measurements: Measurements;
}

interface Metadata {
    prediction: Prediction;
    attributes: MetadataAttribute[];
}

interface Prediction {
    domain: DomainC;
    name: string;
    question: string;
    type: string;
}

interface DomainC {
    type: string;
    values: string[];
}

interface MetadataAttribute {
    domain: DomainR | DomainC;
    name: string;
    question: string;
    type: string;
}

interface DomainR {
    discrete: boolean;
    interval: number;
    lower: number;
    type: string;
    upper: number;
}

interface Exclusions {
    rules: Rule[];
}

interface Rule {
    antecedent: Antecedent | Antecedent[];
    consequent: Consequent | Consequent[];
    type: string;
    relation?: Relation;
}

interface Antecedent {
    index: number;
    threshold: string | number;
    type: string;
}

interface Consequent {
    type: string;
    value: string;
}

interface Relation {
    index: number;
    threshold: number;
    type: string;
}

interface Measurements {
    levers: Lever[];
    oob_error: number;
}

interface Lever {
    drop: number;
    index: number;
}