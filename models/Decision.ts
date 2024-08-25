import mongoose from 'mongoose';

const DecisionSchema = new mongoose.Schema({
    modelId: { type: String, required: true },
    inputData: { type: Object, required: true },
    decision: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Decision || mongoose.model('Decision', DecisionSchema);