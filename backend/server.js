import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Role from './models/role.model.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.get("/api/roles", async (req, res) => {
    try {
        const roles = await Role.find({});
        res.status(200).json({ success: true, data: roles });
    } catch (error) {
        console.log("error in fetching roles:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.post("/api/roles", async (req, res) => {
    const role = req.body;

    if (!role.name || !role.personality) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newRole = new Role(role);

    try {
        await newRole.save();
        res.status(201).json({ success: true, data: newRole });
    } catch (error) {
        console.error("error in creating role:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.put("/api/roles/:id", async (req, res) => {
    const { id } = req.params;

    const role = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid role id" });
    }

    try {
        const updatedRole = await Role.findByIdAndUpdate(id, role, {new: true});
        res.status(200).json({ success: true, data: updatedRole });
    } catch (error) {
        console.error("error in updating role:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.delete("/api/roles/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        await Role.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Role deleted" });
    } catch (error) {
        console.error("error in deleting role:", error.message);
        res.status(404).json({ success: false, message: "Role not found" });
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});