import mongoose from "mongoose";

import Role from "../models/role.model.js";

export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find({});
        res.status(200).json({ success: true, data: roles });
    } catch (error) {
        console.log("error in fetching roles:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createRole = async (req, res) => {
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
};

export const updateRole = async (req, res) => {
    const { id } = req.params;

    const role = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid role id" });
    }

    const exists = await Role.findById(id);
    if (!exists) {
        return res.status(404).json({ success: false, message: "Role id not found" });
    }

    try {
        const updatedRole = await Role.findByIdAndUpdate(id, role, {new: true});
        res.status(200).json({ success: true, data: updatedRole });
    } catch (error) {
        console.error("error in updating role:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteRole = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid role id" });
    }

    const exists = await Role.findById(id);
    if (!exists) {
        return res.status(404).json({ success: false, message: "Role id not found" });
    }

    try {
        await Role.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Role deleted" });
    } catch (error) {
        console.error("error in deleting role:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};