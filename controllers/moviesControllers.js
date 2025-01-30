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
    WHERE movies.id = ?`
    connection.query(sql, [id], (err, results) => {

        if (err)
            return res.status(500).json({ error: err });

        if (results[0]) {
            const sqlReviews = `SELECT reviews.* FROM reviews 
        JOIN movies ON movies.id = reviews.movie_id
        WHERE movies.id = ?`;
            const item = results[0];
            connection.query(sqlReviews, [id], (err, movieReview) => {
                if (err)
                    return res.status(500).json({ error: err });
                item.reviews = movieReview;
                return res.json({ item: item });
            });
        } else { return res.status(404).json({ error: "Not Found" }); }
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