import reservationsModel from '../models/Reservations.js';

const reservationsController = {};

reservationsController.getReservations = async (req, res) => {
    try {
        const reservations = await reservationsModel.find();
        res.status(200).json(reservations);
    } catch (error) {
        console.log("Error" + error);
        res.status(500).json({ message: "Internal server error" });
    }
};

reservationsController.getReservationsById = async (req, res) => {
    try {
        const reservation = await reservationsModel.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        console.log("Error" + error);
        res.status(500).json({ message: "Internal server error" });
    }
};

reservationsController.insertReservations = async (req, res) => {
    const { clientId, roomId, startDate, endDate } = req.body;
    try {
        // Validación de datos
        if (!clientId || !roomId || !startDate || !endDate) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const newReservation = new reservationsModel({ clientId, roomId, startDate, endDate });
        await newReservation.save();
        res.status(200).json({ message: "Reservation saved" });
    } catch (error) {
        console.log("Error" + error);
        res.status(500).json({ message: "Internal server error" });
    }
};

reservationsController.deleteReservations = async (req, res) => {
    try {
        await reservationsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Reservation deleted" });
    } catch (error) {
        console.log("Error" + error);
        res.status(500).json({ message: "Internal server error" });
    }
};

reservationsController.updateReservations = async (req, res) => {
    try {
        const { clientId, roomId, startDate, endDate } = req.body;
        const updatedReservation = await reservationsModel.findByIdAndUpdate(
            req.params.id,
            { clientId, roomId, startDate, endDate },
            { new: true }
        );

        if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.status(200).json({message: "Reservation update"});
    } catch (error) {
        console.log("Error" + error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default reservationsController;