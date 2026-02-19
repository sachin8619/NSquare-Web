import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: String,
  fullDescription: String,
  processSteps: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Service', serviceSchema);
