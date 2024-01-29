import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    appointmentHour: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;