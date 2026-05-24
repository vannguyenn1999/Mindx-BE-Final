import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    identity: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'student' , 'teacher'],
        default: 'user',
    },
    phoneNumber : {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });   

const UserModel = mongoose.model('User', userSchema);

export default UserModel