const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ! MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  database: 'nodejs_beers',
});

// ! Get Request - get all beers
app.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query('SELECT * from beers', (err, rows) => {
      connection.release(); // ! returns the connection to pool
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

// ! Get Request - get beer by ID
app.get('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    connection.query(
      'SELECT * from beers WHERE id= ?',
      [req.params.id],
      (err, rows) => {
        connection.release(); // ! releases the connection to pool
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
});

// ! Delete request - Delete a record of beer
app.delete('/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected with id ${connection.threadId}`);
    connection.query(
      'DELETE from beers WHERE id = ?',
      [req.params.id],
      (err, rows) => {
        connection.release(); // ! releases connection to pool
        if (!err) {
          res.send(`Beer with the record id ${req.params.id} has been removed`);
        } else {
          console.log(err);
        }
      }
    );
  });
});

// ! Post request - Add a record of beer
app.post('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected with id ${connection.threadId}`);
    const params = req.body;
    console.log(req.body);
    connection.query('INSERT INTO beers SET ?', params, (err, rows) => {
      connection.release(); // ! releases connection to pool
      if (!err) {
        res.send(`Beer with record name ${params.name} has been added`);
      } else {
        console.log(err);
      }
    });
  });
});

// ! Put request - update a record by id
app.put('', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected with id ${connection.threadId}`);
    const { id, name, tagline, description, image } = req.body;
    connection.query(
      'UPDATE beers SET name = ? WHERE id = ?',
      [name, id],
      (err, rows) => {
        connection.release(); // ! releases connection to the pool
        if (!err) {
          res.send(`beer with record id ${id} has been updated`);
        } else {
          console.log(err);
        }
      }
    );
  });
});

// ! Listen on port
app.listen(port, () => {
  console.log(`Server listening on port ${port}................`);
});
