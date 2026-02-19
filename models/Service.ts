import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription?: string;
  fullDescription?: string;
  processSteps: string[];
  createdAt: Date;
}

const serviceSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: String,
  fullDescription: String,
  processSteps: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IService>('Service', serviceSchema);
