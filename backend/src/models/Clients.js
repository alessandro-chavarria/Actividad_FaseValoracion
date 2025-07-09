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
      trim: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10,15}$/]
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 80
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Clients", ClientsSchema);