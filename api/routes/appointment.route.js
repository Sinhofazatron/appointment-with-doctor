import express from "express";
import { createAppointment, getAppointments } from "../controllers/appointment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createAppointment);
router.get("/get", getAppointments);

export default router;