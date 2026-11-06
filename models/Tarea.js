const mongoose = require('mongoose');


const tareaSchema = new mongoose.Schema({

  titulo: {
    type: String,
    required: [true, 'El titulo es obligatorio'],
    trim: true,
    minlength: [3, 'El titulo debe tener al menos 3 caracteres']
  },
  descripcion: {
    type: String,
    trim: true
  },

  completada: {
    type: Boolean,
    default: false
  },

  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});


const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = Tarea;
