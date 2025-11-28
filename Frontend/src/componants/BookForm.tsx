import React, { useState } from 'react';
import axios from 'axios';
// import { Book } from '../App';

type Props = {
  setBooks: (books: any[]) => void; // Adjust the type as needed
  editingBook?: any; 
  onEditDone?: () => void; 
  onDeleteDone?: () => void; 
}
const BookForm = ({ setBooks }: Props) => {
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false); // Toast state
  const [errorMessages, setErrorMessages] = useState<{
    title?: string;
    author?: string;
    genre?: string;
    price?: string;
  }>({});
  const addAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setAuthor(e.target.value);
    setError("");
  }

  const addGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setGenre(e.target.value);
    setError("");
  }
  const addPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setPrice(e.target.value);
    setError("");
  }

  const addTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setTitle(e.target.value);
    setError("");
  }

  const submitBook = () => {
    const newErrors: {
      title?: string;
      author?: string;
      genre?: string;
      price?: string;
    } = {};

    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    const trimmedGenre = genre.trim();
    const trimmedPrice = price.trim();

    if (!trimmedTitle) {
      newErrors.title = "Title is required";
    } else if (trimmedTitle.length < 5 || trimmedTitle.length > 30) {
      newErrors.title = "Title must be between 5 and 10 characters";
    }

    if (!trimmedAuthor) {
      newErrors.author = "Author is required";
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedAuthor)) {
      newErrors.author = "Author must contain only letters";
    }

    if (!trimmedGenre) {
      newErrors.genre = "Genre is required";
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedGenre)) {
      newErrors.genre = "Genre must contain only letters";
    }

    if (!trimmedPrice) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(trimmedPrice))) {
      newErrors.price = "Price must be a number";
    } else if (Number(trimmedPrice) < 1) {
      newErrors.price = "Price must be greater than 0";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    // No errors: proceed
    setErrorMessages({}); // Clear errors

    axios.post("http://localhost:3000/book", {
      title: trimmedTitle,
      author: trimmedAuthor,
      genre: trimmedGenre,
      price: trimmedPrice,
    })
      .then((res) => {
        setBooks(res.data);
        setTitle("");
        setAuthor("");
        setGenre("");
        setPrice("");
          setShowToast(true); // Show toast
        setTimeout(() => setShowToast(false), 2000); // Hide after 2s
      })
      .catch((err: any) => {
        console.log(err);
        if (
          err.response &&
          (err.response.status === 409 ||
            (typeof err.response.data?.message === "string" &&
              err.response.data.message.toLowerCase().includes("already exists")))
        ) {
          setErrorMessages({ title: "Title is already exist" });
        } else {
          setErrorMessages({ title: "Server error: " + err.message });
        }
      });
  };
  return (
   <div className="book-form-container">
  <div className="book-form">
    <div className="form-title">Add a New Book</div>

     {/* Toast */}
    {showToast && (
      <div style={{
        position: 'fixed',
        top: 20,
        right: 20,
        border: '1px solid #4BB543',
        background: '#4BB543',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '6px',
        zIndex: 9999,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        Your book was successfully added!
      </div>
    )}

    {/* Title */}
    <div className="form-field">
      <label className="field-label">
        Title<span className="required-asterisk">*</span>
      </label>
      <input
        type="text"
        value={title}
        onChange={addTitle}
        placeholder="Enter book title"
        className={`field-input ${errorMessages.title ? 'error-input' : ''}`}
      />
      {errorMessages.title && (
        <p className="error-message">{errorMessages.title}</p>
      )}
    </div>

    {/* Author */}
    <div className="form-field">
      <label className="field-label">
        Author<span className="required-asterisk">*</span>
      </label>
      <input
        type="text"
        value={author}
        onChange={addAuthor}
        placeholder="Enter author's name"
        className={`field-input ${errorMessages.author ? 'error-input' : ''}`}
      />
      {errorMessages.author && (
        <p className="error-message">{errorMessages.author}</p>
      )}
    </div>

    {/* Genre */}
    <div className="form-field">
      <label className="field-label">
        Genre<span className="required-asterisk">*</span>
      </label>
      <input
        type="text"
        value={genre}
        onChange={addGenre}
        placeholder="Enter book genre"
        className={`field-input ${errorMessages.genre ? 'error-input' : ''}`}
      />
      {errorMessages.genre && (
        <p className="error-message">{errorMessages.genre}</p>
      )}
    </div>

    {/* Price */}
    <div className="form-field">
      <label className="field-label">
        Price<span className="required-asterisk">*</span>
      </label>
      <input
        type="text"
        value={price}
        onChange={addPrice}
        placeholder="Enter book price"
        className={`field-input ${errorMessages.price ? 'error-input' : ''}`}
      />
      {errorMessages.price && (
        <p className="error-message">{errorMessages.price}</p>
      )}
    </div>

    {/* Submit Button */}
    <button
      onClick={submitBook}
      className="form-button"
    >
      Add Book
    </button>
  </div>
</div>

  )
}

export default BookForm