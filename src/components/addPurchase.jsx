import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as core from '@material-ui/core';
import { getAllBooks } from '../services/bookService';
import { createPurchase } from '../services/purchaseService';
import SearchComponent from './searchComponent';


const AddPurchase = () => {
    const [serverBooks, setServerBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState("");
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [filteredName, setFilteredName] = useState('');
    const history = useHistory();
    useEffect(() => {
        const fetchBooks = async () => {
            const books = await getAllBooks();
            setServerBooks(books);
            setFilteredBooks(books);
        }
        fetchBooks();
    }, [])

    const onFilter = event => {
        const { value } = event.target;
        setFilteredName(value);
        const books = serverBooks.filter(book => book.name.startsWith(value));
        setFilteredBooks(books);
    }
    const renderBookSelectOptions = () => {
        const optionStyle = {
            background: "black",
            color: "white"
        }
        let options = filteredBooks.map(book => (
            <option style={optionStyle} value={book.id}>{book.name}</option>
        ))
        options = [<option style={optionStyle} value=""></option>, ...options];
        return options;
    }

    const handlePurchase = async () => {
        try {
            const booksList = [{
                book: selectedBook,
                amount: selectedAmount
            }]
            const totalPrice = calcTotalPrice(booksList);
            const response = await createPurchase(booksList, totalPrice);
            alert(response.message);
            history.push('/');
        } catch (ex) {
            alert(ex);
        }
    }


    const renderAmountOptions = () => {
        let maxBooks = 10;
        if (selectedBook) {
            const index = serverBooks.findIndex(book => book.id === selectedBook);
            if (index > 0 && serverBooks[index].amount < maxBooks) maxBooks = serverBooks[index].amount;
        }
        const arr = [];
        for (let i = 1; i < maxBooks; i++) {
            arr.push(<option value={i}>{i}</option>);
        }
        return arr;
    }

    const calcTotalPrice = booksList => {
        let sum = 0;
        booksList.forEach(bookList => {
            const { book: id, amount } = bookList;
            const { price } = getBookById(id);
            sum += price * amount;
        })
        return sum;
    }
    const getBookById = id => {
        const index = serverBooks.findIndex(book => book.id === id);
        return serverBooks[index];
    }
    return (
        <div style={{ marginBottom: "20px" }}>
            <core.Card>
                <core.CardHeader>
                    <h4>Build Cart for Purchase</h4>
                </core.CardHeader>
                <core.CardContent>
                    <core.Grid container xs={12}>
                        <core.Grid item xs={6}>
                            <div>
                                <h4>BOOK</h4>
                                <SearchComponent
                                    value={filteredName}
                                    onChange={onFilter}
                                />
                                <core.Select
                                    value={selectedBook}

                                    //width="600px"
                                    style={{ left: "70px", width: "200px" }}
                                    onChange={e => setSelectedBook(e.target.value)}
                                >
                                    {renderBookSelectOptions()}
                                </core.Select>
                            </div>

                        </core.Grid>
                        <core.Grid item xs={6}>
                            <div>
                                <h4>AMOUNT</h4>
                                <core.Select
                                    value={selectedAmount}

                                    //width="600px"
                                    style={{ left: "70px", width: "200px" }}
                                    onChange={e => setSelectedAmount(e.target.value)}
                                >
                                    {renderAmountOptions()}
                                </core.Select>
                            </div>

                        </core.Grid>
                    </core.Grid>

                    <h4>Total Price: {selectedBook? getBookById(selectedBook).price* selectedAmount :0}</h4>
                </core.CardContent>


                <core.CardActions>
                    <core.Button
                        onClick={async () => await handlePurchase()}
                        style={{ backgroundColor: "green", color: "white" }}
                    >
                        Add Purchase
               </core.Button>
                </core.CardActions>
            </core.Card>
        </div>
    );
}

export default AddPurchase;