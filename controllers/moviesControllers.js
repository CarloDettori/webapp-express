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
    const id = parseInt(req.params.id);
    const sql = `SELECT books.*, AVG(reviews.vote) AS vote_average FROM books
  JOIN reviews ON reviews.book_id = books.id
  WHERE 	books.id = 2
  GROUP BY reviews.book_id`;
    connection.query(sql, [id], (err, results) => {
        if (err) res.status(500).json({ error: "Errore del server" });
        const item = results[0];
        if (!item) res.status(404).json({ error: "Not Found" });
        const sqlReviews = "SELECT * FROM `reviews` WHERE `book_id` = ?";
        connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) res.status(500).json({ error: "Errore del server" });
            item.reviews = reviews;
            res.json(item);
        });
        //console.log(results[0]);
    });
}


const destroy = (req, res) => {

    const id = parseInt(req.params.id)
    const sql = "DELETE FROM `movies` WHERE `id` = ?"

    connection.query(sql, [id], (err, result) => {
        console.log(result)
        if (err) return (
            res.status(500).json({ error: err.message })
            //console.log("Movie not found")

        )

        if (result.affectedRows > 0) {
            console.log(`Movie id:${id} is removed`)
            return res.status(204)

        } else {
            return res.status(404).json({ message: "element not found" })
        }


    })
}


export {
    index,
    show,
    destroy,
}