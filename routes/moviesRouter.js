
import express from "express"
const moviesRouter = express.Router() // creiamo un'istanza con il metodo router di express
import { index, show, destroy } from "../controllers/moviesControllers.js"

//read:  visualizzazione tutti elementi (index)
moviesRouter.get("/", index)

//read:  visualizzazione 1 elemento (show)
moviesRouter.get("/:id", show)

//create:  creazione 1 elemento (store)
//moviesRouter.post("/", store);

//update:  modifica interamente 1 elemento (update)
//moviesRouter.put("/:id", update);

//update:  modifica parzialmente 1 elemento (modify)
//moviesRouter.patch("/:id", modify);

//delete:  eliminazione 1 elemento (destroy)
moviesRouter.delete("/:id", destroy);

export default moviesRouter