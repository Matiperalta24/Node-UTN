import {mongoose} from "mongoose";


const userSchema = mongoose.Schema(
    {
        fullName: {type: String, required: true, trim: true},
        email: {type: String, required: true, trim: true},
        password: {type: String, required: true, trim: true}
    }, 
    {timestamp: true}
)

userSchema.set("toJSON", {
    transform(doc, ret){
        delete ret.password
    }
})

export const user = mongoose.model ("User", userSchema)