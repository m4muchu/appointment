const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String
  },
  contact: {
    type: String
  },
  slot_time: {
    type: String,
    required: true
  },
  slot_date: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// var Slot = mongoose.model('Slot', slotSchema);

// const appointmentSchema = Schema({
//   id: mongoose.Schema.Types.ObjectId,
//   name: String,
//   email: String,
//   phone: Number,
//   slots: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },
//   created_at: Date
// });

// const Appointment = mongoose.model('Appointment', appointmentSchema);

// module.exports.Slot = Slot;
// module.exports.Appointment = Appointment;
module.exports = Slot = mongoose.model('slot', slotSchema);
