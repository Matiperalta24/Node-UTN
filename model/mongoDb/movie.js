import {mongoose} from "mongoose";
export const {ObjetcId} = mongoose.Types
const currentYear = new Date().getFullYear()

const movieSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
        },
        year:{
            type: Number,
            required: true,
            min: [1896, "Year must be all least 1896"],
            max: [currentYear, `Year cannot exced ${currentYear}`]
        },
        director: {type: String, required: true, trim: true},
        duration: {type: String, required: true, trim: true},
        poster: {type: String, required: true, trim: true},
        genre: {type: String, required: true, trim: true},
        rate: {type: String, required: true, trim: true},
    },
    {Timestamp: true}
)

movieSchema.set("toJSON", {
    transform(doc,ret){
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

export const Movie = mongoose.model("Movie", movieSchema)