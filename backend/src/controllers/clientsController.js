import clientsModel from "../models/Clients.js";
import bcryptjs from "bcryptjs";

const clientsController = {};

clientsController.getClients = async (req, res) => {
    try{
        const clients = await clientsModel.find();
        res.status(200).json(clients);
    }catch (error){
        console.log("Error"+error)
        res.status(500).json({message: "Internal server error"});
    } 
};


clientsController.getClientsById = async (req, res) => {
    try{
        const client = await clientsModel.findById(req.params.id);
        if (!client) {
            return res.status(404).json({message: "Client not found"});
        }
        res.status(200).json(client);
    }catch (error){
        console.log("Error" + error)
        res.status(500).json({message: "Internal server error"});
    } 
};

clientsController.insertClients = async (req, res) => {
    const { name, email, password, phone, age } = req.body;
    try{
      const existClient = await clientsModel.findOne({email})
      if(existClient){
          return res.json({ message: "client already exist" });
      }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        
        const passwordHash = await bcryptjs.hash(password, 10);
        const newClient = new clientsModel({ name, email, password: passwordHash, phone, age });
        await newClient.save();
        res.status(200).json({message: "client saved"});
    }catch (error){
        console.log("Error" + error)
        res.status(500).json({message: "Internal server error"});
    } 
};

clientsController.deleteClients = async (req, res) => {
    try{
        await clientsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "client deleted"});
    }catch(error){
        console.log("Error" + error)
        res.status(500).json({message: "Internal server error"});
    }
  
};

clientsController.updateClients = async (req, res) => {
    try{
        const {name, email, password, phone, age} = req.body;
        const updateClient = await clientsModel.findByIdAndUpdate(
          req.params.id,
          {name, email, password, phone, age},
          { new: true }
        );

        if (!updateClient) {
            return res.status(404).json({message: "Client not found"});
        }

        res.status(200).json({message: "client update"});
        }catch(error){
        console.log("Error" + error)
        res.status(500).json({message: "Internal server error"});
    }
};

export default clientsController;