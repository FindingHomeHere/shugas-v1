import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    fileName: {
      type: String,
      required: [
        true,
        "Make sure you include a file, otherwise it won't update",
      ],
    },
    filePath: {
      type: String,
    },
  },
  {
    autoIndex: true,
  }
);

export default mongoose.models.Menu || mongoose.model('Menu', menuSchema);
