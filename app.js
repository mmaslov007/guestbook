const express = require('express');
const mariadb = require('mariadb');
const path = require('path');

const app = express();
const PORT = 3000;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '0508',
    database: 'guestbook',
});

async function connect() {
    try {
        return await pool.getConnection();
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/submit', async (req, res) => {
    console.log('POST /submit called'); // Debug log
    console.log('Request body:', req.body); // Log form data
    
    const { fname, lname, job_title, company, linkedin, email, message, mailing_list } = req.body;

    try {
        const conn = await connect();
        await conn.query(
            `INSERT INTO contacts (fname, lname, job_title, company, linkedin, email, message, mailing_list) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [fname, lname, job_title, company, linkedin, email, message, mailing_list === 'on']
        );
        res.redirect('/thank_you');
    } catch (err) {
        console.error('Error saving entry:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/thank_you', (req, res) => {
    res.render('thank_you');
});

app.get('/reservations', async (req, res) => {
    try {
        const conn = await connect();
        const entries = await conn.query('SELECT * FROM contacts ORDER BY date_submitted DESC');
        res.render('reservations', { entries });
    } catch (err) {
        console.error('Error fetching entries:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
