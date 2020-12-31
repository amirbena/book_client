import React, { useState, useEffect } from 'react';
import * as core from '@material-ui/core'

import { createBook, updateBook } from '../services/bookService';



const BookPopup = ({ book = null,setBook, isOpen, setBooksList, setIsOpen, allBooks, setStringFilter }) => {
    const intialValues = {
        name: "",
        numPages: 0,
        publisherName: "",
        authorName: "",
        price: 0,
        amount: 0
    }
    const [bookState, setBookState] = useState(intialValues);
    useEffect(() => {
        if (book) {
            const { name, numPages, publisher, author, price, amount } = book;
            setBookState({
                name,
                numPages,
                publisherName:publisher,
                authorName: author,
                price,
                amount
            })
        }
        else setBookState(intialValues);
    }, [book]);

    const onChange = e => {
        const { name, value } = e.target;
        setBookState({
            ...bookState,
            [name]: value
        })
    }

    const validateButton = () => {
        for (let key in bookState) {
            if (!bookState[key]) return true;
        }
        return false;
    }

    const onUpdate = async () => {
        try {
            const { id } = book;
            const response = await updateBook(id, bookState);
            let booksToChange = allBooks.filter(bookList => bookList.id !== id);
            booksToChange = booksToChange.filter(bookList => bookList.id !== id);
            console.log(booksToChange);
            setStringFilter("");
            booksToChange = [...booksToChange, response.book];
            setBooksList(booksToChange)
            return response.message;
        } catch (error) {
            alert(error);
        }
    }

    const onCreate = async () => {
        try {
            const response = await createBook(bookState);
            const booksToChange = [...allBooks, response.book];
            setBooksList(booksToChange);
            setStringFilter("");
            return response.message;
        } catch (error) {
            alert(error);
        }
    }
    const submit = async () => {
        let message;
        if (book) {
            message = await onUpdate();
        }
        else message= await onCreate();
        alert(message);
        setBook(null);
        setBookState(intialValues);
        setIsOpen(false);

    }
    return (
        <core.Dialog open={isOpen} onClose={() => setIsOpen(false)} >
            <core.DialogTitle> Handle Book</core.DialogTitle>
            <div>
                <core.TextField
                    value={bookState.name}
                    label="Book Name"
                    name="name"
                    onChange={onChange}
                />
                <core.TextField
                    value={bookState.numPages}
                    type="number"
                    label="Pages Number"
                    name="numPages"
                    onChange={onChange}
                />
                <core.TextField
                    value={bookState.publisherName}
                    label="Publisher"
                    name="publisherName"
                    onChange={onChange}
                />
                <core.TextField
                    value={bookState.authorName}
                    label="Author"
                    name="authorName"
                    onChange={onChange}
                />
                <core.TextField
                    value={bookState.amount}
                    type="number"
                    label="Amount"
                    name="amount"
                    onChange={onChange}
                />
                <core.TextField
                    value={bookState.price}
                    type="number"
                    label="Price for one"
                    name="price"
                    onChange={onChange}
                />


            </div>

            <core.DialogActions>
                <core.Button
                    disabled={validateButton()}
                    style={{ "background": "yellow" }}
                    onClick={async () => await submit()}
                >
                    Submit
                </core.Button>

            </core.DialogActions>
        </core.Dialog >
    );
}

export default BookPopup;