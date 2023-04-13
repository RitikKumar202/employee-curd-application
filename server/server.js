const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/getEmployee", (req, res) => {
    const getEmployee = "SELECT * FROM contact_db";
    db.query(getEmployee, (error, result) => {
        res.send(result);
    });
});

app.post("/api/addEmployee", (req, res) => {
    const { name, email, phone, jobTitle, address, city, state, pName, pContact, pRelation, sName, sContact, sRelation } = req.body;
    const addData = "INSERT INTO contact_db (name, email, phone, jobTitle, address, city, state, pName, pContact, pRelation, sName, sContact, sRelation) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(addData, [name, email, phone, jobTitle, address, city, state, pName, pContact, pRelation, sName, sContact, sRelation], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/delete/:id", (req, res) => {
    const { id } = req.params;
    const deleteData = "DELETE FROM contact_db WHERE id = ?";
    db.query(deleteData, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/getEmployee/:id", (req, res) => {
    const { id } = req.params;
    const getEmployee = "SELECT * FROM contact_db WHERE id = ?";
    db.query(getEmployee, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone, jobTitle, address, city, state, pName, pContact, pRelation, sName, sContact, sRelation } = req.body;
    const updateEmployee = "UPDATE contact_db SET name = ?, email = ?, phone = ?, jobTitle = ?, address = ?, city = ?, state = ?, pName = ?, pContact = ?, pRelation = ?, sName = ?, sContact = ?, sRelation = ? WHERE id = ? ";
    db.query(updateEmployee, [name, email, phone, jobTitle, address, city, state, pName, pContact, pRelation, sName, sContact, sRelation, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req, res) => {
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
});