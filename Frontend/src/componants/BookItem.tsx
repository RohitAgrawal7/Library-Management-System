import type { Book } from '../App'
import React, { useState } from 'react';
import axios from 'axios';
type Props = {
    book: Book;
    setBooks: (books: Book[]) => void;
}

const BookItem = ({ book, setBooks }: Props) => {

    const [edit, setEdit] = useState(false);
    const [author, setAuthor] = useState(book.author);
    const [genre, setGenre] = useState(book.genre);
    const [price, setPrice] = useState(book.price);
    const [title, setTitle] = useState(book.title);

    // Function to delete a book
    const deleteBook = () => {
        console.log('Delete book with id:', book);
        axios.delete(`http://localhost:3000/book/${book.id}`).then((response) => {
            setBooks(response.data); // Update the book list after deletion 
        });
    }

    const editBook = () => {
        console.log('Edit book with id:', book);
        setEdit(!edit);

        if (edit) {
            if (title !== book.title || author !== book.author || genre !== book.genre || price !== book.price) {
                // If the edit mode is toggled off, send the updated book data to the server
                console.log("Send Request");
                axios.put(`http://localhost:3000/book/${book.id}`, {
                    id: book.id,
                    title: title,
                    author: author,
                    genre: genre,
                    price: price
                }).then((response) => {
                    console.log('Book updated:', response.data);
                    setBooks(response.data); // Update the book list after deletion
                });
            } else {
                console.log('No changes made to the book');
            }
        }
    }



    const editAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setAuthor(e.target.value);
    }

    const editGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setGenre(e.target.value);
    }
    const editPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setPrice(e.target.value);
    }

    const editTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setTitle(e.target.value);
    }

    return (
        <>
            <div className='book-container'>
                
                {edit ? (<input type="text" value={title} onChange={editTitle} />
                ) : (
                    <div className='title'>{book.title}</div>)}

                <div className='book-details'>
                    <div className="detail-category"  >Author:</div>
                    {edit ? (
                        <input type="text" value={author} onChange={editAuthor} />
                    ) : (
                        <div>{book.author}</div>
                    )}
                </div>

                <div className='book-details'>
                    <div className="detail-category">Genre:</div>
                    {edit ? (<input type="text" value={genre} onChange={editGenre} />
                    ) : (
                        <div>{book.genre}</div>)}
                </div>

                <div className='book-details'>
                    <div className="detail-category">Price:</div>
                    {edit ? (<input type="text" value={price} onChange={editPrice} />
                    ) : (
                    <div>{book.price}</div>)}
                </div>

                <button onClick={editBook}>{edit ? "Save" : "Edit"}</button>
                <button onClick={deleteBook}>Delete</button>

            </div>

        </>
    )
}

export default BookItem