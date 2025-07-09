/*
Campos:

name,
email,
password,
phone,
age
*/ 

import { Schema, model } from "mongoose";

const ClientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Clients", ClientsSchema);