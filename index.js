
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const tareasRoutes = require('./routes/tareas');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conexion a MongoDB exitosa');
  })
  .catch((error) => {
    console.log('Error al conectar a MongoDB:', error.message);
  });

app.get('/', (req, res) => {
  res.send('API de tareas funcionando');
});


app.use('/tareas', tareasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
