const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  dateofevent: { type: Date, required: true }
});

module.exports = mongoose.model('Events', eventSchema);