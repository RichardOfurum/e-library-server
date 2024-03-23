import mongoose from "mongoose";
import * as bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
    // name: { type: String, require: true },
    username: { type: String, required: true },
    password: { type: String, required: true },


    isAdmin: { type: Boolean, default: false },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function (next: any) {
    try {
        if (!this.isModified('password')) return next();

        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();

    } catch (error) {
        return next(error)
    }
});