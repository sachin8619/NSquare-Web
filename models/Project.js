import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
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

export default mongoose.model('Project', projectSchema);
