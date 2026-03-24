const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Add expense
app.post('/add', (req, res) => {
    const { amount, category, date } = req.body;

    const sql = "INSERT INTO expenses (amount, category, date) VALUES (?, ?, ?)";
    db.query(sql, [amount, category, date], (err, result) => {
        if (err) throw err;
        res.send("Added");
    });
});

// Get expenses
app.get('/get', (req, res) => {
    db.query("SELECT * FROM expenses", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Delete expense
app.delete('/delete/:id', (req, res) => {
    db.query("DELETE FROM expenses WHERE id = ?", [req.params.id], (err) => {
        if (err) throw err;
        res.send("Deleted");
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});