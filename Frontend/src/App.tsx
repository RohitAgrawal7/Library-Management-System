import { useEffect, useState } from 'react'
import Books from './componants/Books' 
import BookForm from './componants/BookForm'
import './App.css'
import axios from 'axios'

 export type Book = {
  id:number;
  title: string;
  author: string;
  genre: string;
  price: string;
}


function App() {

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setTimeout(() => {
      axios.get('http://localhost:3000/book')
      .then(response => {
        const data = response.data;
        console.log(data);
        setBooks(data);
      })
      .catch(error => {
        console.error( error);
      });
    }, 1000);
    }, []);

        console.log(books);
      if (books.length === -1) {
        return <div>Loading...</div>;
      }else{

  return (
    <div>
     <div >
      {/* <h1> My Libarary</h1> */}
     <BookForm setBooks={setBooks}/>
      {books.length === 0? <div>Loading...</div>: <Books books={books} setBooks={setBooks}/>}
     </div>
    </div>
  )
  }
}

export default App
