import connection from "../connection.js"

const index = (req, res) => {
    const sql = "SELECT * FROM `movies`"
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        // console.log(results);
        res.json({
            length: results.length,
            items: results
        })
    })
}

const show = (req, res) => {
    const id = parseInt(req.params.id)
    const sql = "SELECT * FROM `movies` WHERE `id` = ?"
    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({
            error: "Databse query failed"
        })

        if (result[0])
            return res.json({ item: result[0] })
        if (result[0] === undefined)
            console.log(result)
        return res.status(500).json({ error: "movie not found" })
    })
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id)
    const sql = "DELETE FROM `movies` WHERE `id` = ?"
    connection.query(sql, [id], (err, result) => {
        if (err) return (
            res.status(500),
            console.log("Movie not find")

        )

        if (result) {
            console.log(`Movie id:${id} is removed`)
            return res.status(204)

        }
        return res.json({ message: "element  deleted" })


    })
}


export {
    index,
    show,
    destroy,
}