import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  category?: string;
  shortDescription?: string;
  fullDescription?: string;
  image?: string;
  client?: string;
  location?: string;
  year?: string;
  status?: string;
  createdAt: Date;
}

const projectSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: String,
  shortDescription: String,
  fullDescription: String,
  image: String,
  client: String,
  location: String,
  year: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProject>('Project', projectSchema);
