import connection from "../connection.js"
import mysql from 'mysql2';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
});

export default pool;

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
    const sql = `SELECT movies.* FROM movies
  JOIN reviews ON reviews.movie_id = movies.id
  WHERE 	movies.id = 2
  GROUP BY reviews.movies_id`;
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