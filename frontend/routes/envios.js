const express = require("express");
const router = express.Router();
const db = require("../db"); 


router.get("/", (req, res) => {
  db.query("SELECT * FROM rutas", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener las rutas", details: err.message });
    res.json(results);
  });
});


router.get("/:pedido_id", (req, res) => {
  const { pedido_id } = req.params;
  db.query("SELECT * FROM rutas WHERE pedido_id = ?", [pedido_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener la ruta", details: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Ruta no encontrada para este pedido" });
    res.json(results);
  });
});


router.post("/", (req, res) => {
  const { pedido_id, ubicacion_actual, estado } = req.body;
  
  if (!pedido_id || !ubicacion_actual || !estado) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  db.query(
    "INSERT INTO rutas (pedido_id, ubicacion_actual, estado, fecha_actualizacion) VALUES (?, ?, ?, NOW())",
    [pedido_id, ubicacion_actual, estado],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al agregar la actualización de rastreo", details: err.message });
      res.status(201).json({ id: result.insertId, pedido_id, ubicacion_actual, estado, fecha_actualizacion: new Date() });
    }
  );
});


router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { ubicacion_actual, estado } = req.body;

  if (!ubicacion_actual || !estado) {
    return res.status(400).json({ error: "Ubicación y estado son obligatorios" });
  }

  db.query(
    "UPDATE rutas SET ubicacion_actual = ?, estado = ?, fecha_actualizacion = NOW() WHERE id = ?",
    [ubicacion_actual, estado, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al actualizar la ubicación", details: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: "Ruta no encontrada" });
      res.json({ message: "Ubicación de envío actualizada correctamente", fecha_actualizacion: new Date() });
    }
  );
});

module.exports = router;
