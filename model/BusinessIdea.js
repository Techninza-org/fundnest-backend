const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessIdeaSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  attachments: {
    type: [String],
    required: true
  },
  paymentAmount: {
    type: Number,
    required: false
  },
  payment_id: {
    type: String,
    required: false
  }
  
}, {
  timestamps: true
});

const BusinessIdea = mongoose.model('BusinessIdea', businessIdeaSchema);
module.exports = BusinessIdea;




