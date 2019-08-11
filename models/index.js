const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  file_name: { type: String },
  file_path: { type: String },
  file_size: { type: Number },
  data: { type: Object },
  is_active: { type: Number },
  created_by: { type: String },
  updated_by: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const FileModel = mongoose.model('File', FileSchema);
module.exports = FileModel;
