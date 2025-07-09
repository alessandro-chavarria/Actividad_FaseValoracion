/*
Campos:

clientId,
vehicle,
service,
status.
*/

import { Schema, model } from "mongoose";

const ReservationsSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
      required: true,
    },
    vehicle: {
      type: String,
      required: true
    },
    service: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Reservations", ReservationsSchema);