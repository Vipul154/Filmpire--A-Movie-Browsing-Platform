// Model is really important for us to understand the schema of the user.
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique : true,
    },
    email : {
        type: String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        default : "",
    },
    searchHistory : {
        type : Array,
        default : []
    }
})

const User = mongoose.model("User", userSchema)
// Create a user model based on this userSchema.
// Mongoose will convert it to users, Animal => animals. The first letter should be capital.

export {User}
