const express = require("express");
const router = express.Router();
const db = require("../db"); 


router.get("/", (req, res) => {
  db.query("SELECT * FROM pedidos", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener los pedidos", details: err.message });
    res.json(results);
  });
});


router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM pedidos WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener el pedido", details: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(results[0]);
  });
});


router.post("/", (req, res) => {
  const { cliente_id, producto_id, cantidad } = req.body;
  if (!cliente_id || !producto_id || !cantidad) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  db.query(
    "INSERT INTO pedidos (cliente_id, producto_id, cantidad, estado) VALUES (?, ?, ?, 'Pendiente')",
    [cliente_id, producto_id, cantidad],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al crear el pedido", details: err.message });
      res.status(201).json({ id: result.insertId, cliente_id, producto_id, cantidad, estado: "Pendiente" });
    }
  );
});


router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  if (!estado) return res.status(400).json({ error: "El estado es obligatorio" });

  db.query("UPDATE pedidos SET estado = ? WHERE id = ?", [estado, id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al actualizar el pedido", details: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json({ message: "Pedido actualizado correctamente" });
  });
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM pedidos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error al eliminar el pedido", details: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json({ message: "Pedido eliminado correctamente" });
  });
});

module.exports = router;
