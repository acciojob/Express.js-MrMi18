// let Books = [];


// const bodyParser = require('body-parser');
// const express = require('express');
// const app = express();
// app.use(express.json());
// app.use(bodyParser.json())

// app.get("/books", (req, res) => {
//   res.json(Books);
// })

// app.get("/books/:id" , (req,res) => {
  
//   const {id } = req.params;
//   console.log(Books)
//    const book =  Books.filter((book) => book.id===id);
//    if(!book) res.status(404).json("book is not found")
//     res.json(book);
  
// })

// app.post("/books" , (req,res) => {
  
//      const book = req.body;
//      Books.push(book);
//      res.json("Book added Successfully");
// })
// app.put("/books/:id", (req,res) =>{
//   const body= req.body;
//   const book = Books.filter((book) => book.id === body.id);
//   if(!book) res.status(404).json("Book not found");
//   Books = Books.map((book) => {
//     if(book.id === body.id) return body;
//     return book;
//   })
//   res.json(Books)

// })
// app.delete("/books/:id", (req,res) =>{
//   const {id} = req.params;
//   const  book = Books.filter((book) => book.id === id);
//   if(!book) res.status(404).json("Book not found ");
//   Books =  Books.filter((book) => book.id !== id);
//   res.json("book deleted")

// })

// const server = app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });
// // Each book has an ID, title, author, and publication year.
const express = require('express');
const app = express();
app.use(express.json());

// Define the routes and implement the CRUD operations for the books collection
let books = [
  { id: 1, title: 'Book1', author: 'Author1', publicationYear: 2020 }
];
let currentId = 2; // Simulating auto incrementing IDs

// GET /books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// GET /books/:id
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// POST /books
app.post('/books', (req, res) => {
  const newBook = {
    id: currentId++,
    title: req.body.title,
    author: req.body.author,
    publicationYear: req.body.publicationYear
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    Object.assign(book, req.body);
    res.status(200).json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// DELETE /books/:id
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex !== -1) {
    const [deletedBook] = books.splice(bookIndex, 1);
    res.status(200).json(deletedBook);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

module.exports = app;

const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});