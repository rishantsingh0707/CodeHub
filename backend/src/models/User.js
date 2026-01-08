import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String,
        select: false, 
    }
    ,
    avatar: {
        type: String, default: ''
    },
    googleId: {
        type: String, unique: true
    },
    followers: {
        type: String
    },
    following: {
        type: [String], default: []
    },
    longestStreak: {
        type: Number, default: 0
    },
    currentStreak: {
        type: Number, default: 0
    },
    lastActive: {
        type: Date, default: null
    },
    bio: {
        type: String, default: ''
    },
    skills: {
        type: [String], default: []
    },
},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;