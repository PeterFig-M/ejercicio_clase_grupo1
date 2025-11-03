const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", genero: "Realismo mágico", anioPublicacion: 1967 },
  { id: 2, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", genero: "Novela", anioPublicacion: 1605 },
  { id: 3, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", genero: "Fábula", anioPublicacion: 1943 }
];

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
  res.json(book);
});

app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedBook = req.body;

  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Libro no encontrado' });
  }


  books[index] = { ...books[index], ...updatedBook };

  res.json({ message: 'Libro actualizado correctamente', book: books[index] });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

