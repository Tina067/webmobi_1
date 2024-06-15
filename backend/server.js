const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

const JWT_SECRET = 'your_jwt_secret'; 


app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [name, email, hashedPassword];

    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM login WHERE `email` = ?";

    db.query(sql, [email], async (err, data) => {
        if (err) {
            return res.status(500).json("Error occurred during query execution");
        }
        if (data.length === 0) {
            return res.status(401).json("Invalid email or password");
        }

        const user = data[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json("Invalid email or password");
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: "Success", token });
    });
});


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json("Access denied");
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json("Invalid token");
        }
        req.user = user;
        next();
    });
};


app.get('/home', authenticateToken, (req, res) => {
    return res.json("Protected profile information");
});

app.listen(8081, () => {
    console.log(`listening on port ${8081}`);
});
