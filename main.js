let Books = [];


const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(express.json());
app.use(bodyParser.json())

app.get("/books", (req, res) => {
  res.json(Books);
})

app.get("/books/:id" , (req,res) => {
  
  const {id } = req.params;
  console.log(Books)
   const book =  Books.filter((book) => book.id===id);
   if(!book) res.status(404).json("book is not found")
    res.json(book);
  
})

app.post("/books" , (req,res) => {
  
     const book = req.body;
     Books.push(book);
     res.json("Book added Successfully");
})
app.put("/books/:id", (req,res) =>{
  const body= req.body;
  const book = Books.filter((book) => book.id === body.id);
  if(!book) res.status(404).json("Book not found");
  Books = Books.map((book) => {
    if(book.id === body.id) return body;
    return book;
  })
  res.json(Books)

})
app.delete("/books/:id", (req,res) =>{
  const {id} = req.params;
  const  book = Books.filter((book) => book.id === id);
  if(!book) res.status(404).json("Book not found ");
  Books =  Books.filter((book) => book.id !== id);
  res.json("book deleted")

})

const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
// Each book has an ID, title, author, and publication year.