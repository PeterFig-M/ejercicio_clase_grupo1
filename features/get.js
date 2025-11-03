const express = require('express');
const fs = require('fs');
const router = express.Router();

// la ruta del JSON que simula la base de datos
const DATA_PATH = './data/books.json';


// GET... y Devuelve todos los libros
router.get('/', (req, res) => {
  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Error al leer los datos de libros' });
    }

    const books = JSON.parse(data);
    res.json(books);
  });
});

// GET con ID
// Devuelve 1 libro específico por ID
router.get('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);

  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Error al leer los datos de libros' });
    }

    const books = JSON.parse(data);
    const book = books.find(b => b.id === bookId);

    if (!book) {
      return res
        .status(404)
        .json({ message: 'Libro no encontrado' });
    }

    res.json(book);
  });
});

module.exports = router;
