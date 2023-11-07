import { Schema, Document } from "mongoose";
import db from "../config/dbConnection.js";

const userSchema = new Schema({
  username: {
    type: "string",
    required: [true, "username is required"],
    unique: true,
  },
  password: {
    type: "string",
    required: [true, "Password is required"],
    unique: false,
    validate: {
      validator: (value) => {
        return value.length >= 6;
      },
      message: () => "Password must be at least 6 characters",
    },
  },
});

export const User = db.model("User", userSchema);
