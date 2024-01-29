import Appointment from '../models/appointment.model.js'

export const createAppointment = async (req, res, next) => {
	try {
		const appointment = await Appointment.create(req.body)
		return res.status(201).json(appointment);
	} catch (error) {
		next(error)
	}
}

export const getAppointments = async (req, res, next) => {
  try {
    const appointment = await Appointment.find(req.body)

    return res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};