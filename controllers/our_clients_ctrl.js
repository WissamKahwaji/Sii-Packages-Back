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

export const getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await ourClients.findById(id);
    res.status(200).json(client);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const addClient = async (req, res, next) => {
  try {
    const { name } = req.body;
    const logoPath =
      req.files && req.files["logoImg"] ? req.files["logoImg"][0].path : null;
    const newClient = new ourClients({
      name: name,
      logo: logoPath
        ? `${process.env.BASE_URL}${logoPath.replace(/\\/g, "/")}`
        : null,
    });
    const savedOurAgentsData = await newClient.save();
    return res.status(201).json(savedOurAgentsData);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const editClientData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const client = await ourClients.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Our Client data not found" });
    }
    if (name) {
      client.name = name;
    }
    if (req.files && req.files["logoImg"]) {
      const imgPath = req.files["logoImg"][0].path;
      client.logo = `${process.env.BASE_URL}` + imgPath.replace(/\\/g, "/");
    }
    const updatedClient = await client.save();
    return res.status(200).json(updatedClient);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const deleteOurClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedClient = await ourClients.findByIdAndDelete(id);
    if (!deleteOurClient) {
      return res.status(404).json({ message: "Our Client data not found" });
    }
    return res
      .status(200)
      .json({ message: "Our Client data deleted successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
