const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "supersecreto"; 


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "techlogistics_db"
});

db.connect(err => {
    if (err) console.error("Error al conectar a la BD:", err);
    else console.log("✅ Conectado a MySQL");
});


function verificarToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).send("Acceso denegado");

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).send("Token inválido");
        req.userId = decoded.id;
        next();
    });
}


const pedidosRoutes = require("./routes/pedidos");
const enviosRoutes = require("./routes/envios");

app.use("/pedidos", pedidosRoutes);
app.use("/envios", enviosRoutes);


app.post("/registro", async (req, res) => {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) return res.status(400).send("Faltan datos");

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";

    db.query(sql, [nombre, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Usuario registrado con éxito");
    });
});


app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("Faltan datos");

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(401).send("Usuario no encontrado");

        const usuario = results[0];
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) return res.status(401).send("Contraseña incorrecta");

        const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    });
});


app.get("/clientes", verificarToken, (req, res) => {
    db.query("SELECT * FROM clientes", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


app.post("/clientes", verificarToken, (req, res) => {
    const { nombre, email, telefono } = req.body;
    if (!nombre || !email || !telefono) return res.status(400).send("Faltan datos");

    const sql = "INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)";
    db.query(sql, [nombre, email, telefono], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Cliente agregado con éxito");
    });
});


app.delete("/clientes/:id", verificarToken, (req, res) => {
    const sql = "DELETE FROM clientes WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Cliente eliminado con éxito");
    });
});

app.use(express.static("public"));


app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});
