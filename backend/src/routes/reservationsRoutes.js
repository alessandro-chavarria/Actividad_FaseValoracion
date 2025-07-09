import express from "express";
import reservationsController from "../controllers/reservationsController.js";

const router = express.Router();

router
    .route("/")
    .get(reservationsController.getReservations)
    .post(reservationsController.insertReservations);

router
    .route("/:id")
    .delete(reservationsController.deleteReservations)
    .put(reservationsController.updateReservations)
    .get(reservationsController.getReservationsById);

export default router;