import {Movie} from "../model/mongoDb/movie.js"

export const movieController = {
    async getAll (req, res){
        const movieCollection = await Movie.find()
        movieCollection ? res.status(200).json({
            success: true,
            message: "Listado de películas",
            data: movieCollection
        })
        : res   .status(404)
                .json({success: false, message: "Base de datos vacía"})
    }, 
    async getByTitle(req, res){
        const {title} = req.query
        if (!title)
            res .status(400)
                .json({succes: false, message:"Missin 'title' query param"})
        try{
            const movies = await Movie.find({
                title: {$regex: title, $options: "i"}
            })
            if (!movies.length){
                return res.status(404).json({
                    success: false,
                    message: `No existen peliculas con ese ${title} en la lista`
                })
            }
        } catch(err){
            return res 
                .status(500)
                .json ({success: false, message: `Oops tenemos un error ${err.message}`})
        }
        
    },
    async createOne (req, res){
        const { title, year, director, duration, poster, genre, rate} = req.body
        try{
            const newMovie = new Movie({
                title,
                year,
                director,
                duration,
                poster,
                genre,
                rate,
            })
            const saveMovie = await newMovie.save()
            res .status(200)
                .json ({success: true, message: "Movie created", data: saveMovie})
        }catch(err){
            res.status(400).json({success: false, message: err.message})
        }
    }, 
    async updateMovie (req, res){
        const allowedFields = [
            "title",
            "year",
            "director",
            "duration",
            "poster",
            "genre",
            "rate",
        ]
        try{
            const updates = Object.keys(req.body)
            const isValidOperation = updates.every((updates)=>
                allowedFields.includes(updates)
            )
            if (!isValidOperation){
                return res.status(400).json({
                    success: false,
                    message: "Invalid field in the request body"
                })
            }
            const movie = await Movie.findByIdAndUpdate (req.params.id, req.body, {
                new: true
            })
            if (!movie){
                return res.status(404).json({
                    success: false,
                    message: `Película no encontrada`
                })
            }
            res .status(200)
                .json({success: true, message:"Movie updated", data: movie})
        }catch(err){
            res.status(500).json({
                success: false,
                message: `Error en el servidor ${err.message}`
            })
        }
    },
    async deleteOne(req, res){
        try{
            const movie = await Movie.findByIdAndDelete (req.params.id)
            if(!movie){
                return res.status(404).json({
                    success: false,
                    message: `Película no encontrada`
                })
            }
            res.send(204)
        }catch(err){
            res.status(500).json({success: false, message: err.message})
        }
    }
}