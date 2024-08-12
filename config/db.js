import { connect } from "mongoose";

const db_uri = process.env.db_uri
async function main(){
    await connect(db_uri)
}

main()
    .then(() =>
        console.log("Conectado a la base de datos de MongoDB")
    )
    .catch ((err) => 
        console.log(`Ocurrió un error durante la conexión a la base de datos:${err.message}`)
    )