// app.js — API de libros (GET desde router + POST + PUT + DELETE usando data/books.json)
const express = require('express');
const fs = require('fs');
const path = require('path');

// Rutas GET (tu feature)
const getRoutes = require('./features/get');

const app = express();
app.use(express.json());

// “Base de datos” (archivo JSON)
const booksFile = path.join(__dirname, 'data', 'books.json');

// Utilidades para leer/escribir
function readBooks() {
  if (!fs.existsSync(booksFile)) return [];
  return JSON.parse(fs.readFileSync(booksFile, 'utf-8'));
}
function writeBooks(books) {
  fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
}

// RUTAS GET (montadas desde tu feature)
app.use('/api/books', getRoutes);

// POST: Agregar libro
app.post('/api/books', (req, res) => {
  const books = readBooks();
  const { titulo, autor, genero, anioPublicacion } = req.body;

  if (!titulo || !autor || !genero || !anioPublicacion) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
  const newBook = {
    id: newId,
    titulo,
    autor,
    genero,
    anioPublicacion: Number(anioPublicacion),
  };

  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
});

// PUT: Actualizar libro por id
app.put('/api/books/:id', (req, res) => {
  const books = readBooks();
  const id = parseInt(req.params.id, 10);

  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Libro no encontrado' });
  }

  const { titulo, autor, genero, anioPublicacion } = req.body;

  if (titulo !== undefined) books[index].titulo = titulo;
  if (autor !== undefined) books[index].autor = autor;
  if (genero !== undefined) books[index].genero = genero;
  if (anioPublicacion !== undefined) {
    books[index].anioPublicacion = Number(anioPublicacion);
  }

  writeBooks(books);
  res.json({ message: 'Libro actualizado correctamente', book: books[index] });
});

// DELETE: Eliminar libro por id
app.delete('/api/books/:id', (req, res) => {
  const books = readBooks();
  const id = parseInt(req.params.id, 10);

  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Libro no encontrado' });
  }

  const deletedBook = books.splice(index, 1)[0];
  writeBooks(books);
  res.json(deletedBook);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


