import { ourClients } from "../models/our_clients/outClients_model.js";

export const getOurClients = async (req, res, next) => {
  try {
    const clients = await ourClients.find();
    res.status(200).json(clients);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
