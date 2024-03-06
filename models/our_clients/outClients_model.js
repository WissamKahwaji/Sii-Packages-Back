import mongoose from "mongoose";

const ourClientsSchema = new mongoose.Schema({
  name: String,
  logo: String,
  bio: String,
});

export const ourClients = mongoose.model("ourClients", ourClientsSchema);
