import mongoose from "mongoose";

const teacherPositionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    des: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        default: true,
        
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });   

const TeacherPositionsModel = mongoose.model('Teacher-Positions', teacherPositionsSchema);


export default TeacherPositionsModel;