
import type { Book } from '../App'
import BookItem from './BookItem';
type Props = {
    books: Book[];
    setBooks:(books: Book[])=> void;
}
const Books = ({ books,setBooks }: Props) => {
    return (
        <div className='books-card'>
            {books.map((book) => {
               return <BookItem key={book.id} book={book} setBooks={setBooks}/>
            })}
        </div>
    )
}

export default Books;