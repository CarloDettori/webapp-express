import express from "express"// importiamo express
const server = express() // importuiamo cors
const PORT = process.env.PORT || 3000 // creiamo istanza server
import cors from "cors" // importiamo dal file env le variabili di ambiente
import moviesRouter from "./routes/moviesRouter.js"
//middleware
server.use(express.static("public"))
server.use(cors())
server.use(express.json())
server.use("/movies", moviesRouter);
//prima rotta generica
// server.get("/movies", (req, res) => {
//     res.send("Server funzionante")
// })

//rotta generica pagina non trovata
server.get("*", (req, res) => {
    res.send("page not found")
});

//rotta ascolto
server.listen(PORT, () => {
    console.log(`Il server è in ascolto su http://localhost:${PORT}`)
})