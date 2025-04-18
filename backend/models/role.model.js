import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    personality: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true // createdAt, updatedAt
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
