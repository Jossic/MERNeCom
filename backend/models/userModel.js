import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    },
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function (enteredPassord) {
    return await bcrypt.compare(enteredPassord, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;