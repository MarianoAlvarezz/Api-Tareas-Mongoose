const express = require('express');
const Tarea = require('../models/Tarea');

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    const tareaGuardada = await tarea.save();
    res.status(201).json(tareaGuardada);
  } catch (error) {
    manejarError(error, res);
  }
});


router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    manejarError(error, res);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    res.json(tarea);
  } catch (error) {
    manejarError(error, res);
  }
});


router.put('/:id', async (req, res) => {
  try {

    const tareaActualizada = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!tareaActualizada) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    res.json(tareaActualizada);
  } catch (error) {
    manejarError(error, res);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);

    if (!tareaEliminada) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    manejarError(error, res);
  }
});


function manejarError(error, res) {

  if (error.name === 'ValidationError') {
    const mensajes = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ mensaje: 'Datos invalidos', errores: mensajes });
  }


  if (error.name === 'CastError') {
    return res.status(400).json({ mensaje: 'El id no es valido' });
  }

  console.log(error);
  res.status(500).json({ mensaje: 'Error del servidor' });
}

module.exports = router;
