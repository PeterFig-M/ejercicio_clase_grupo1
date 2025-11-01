const express = require('express');
const app = express();

// Importamos las rutas GET que se va escribir en features/get
const getRoutes = require('./features/get');

// Middleware para poder leer JSON en requests -- para que agruen el post se los dejo aqui
app.use(express.json());

// todos los libros
app.use('/api/books', getRoutes);

// para Levantar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
