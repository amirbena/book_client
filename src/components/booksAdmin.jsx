import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TableContainer, TableBody, Table, Button, Paper, TableHead, TableRow, Typography } from '@material-ui/core'
import useStyles from '../styles/tableStyle';
import { StyledTableCell, StyledTableRow } from './styledTableData';
import { deleteBook, getAllBooks } from '../services/bookService';
import SearchComponent from './searchComponent'

import BooksPopup from './bookPopup';



const BooksAdmin = () => {
    const [books, setBooks] = useState([]);
    const classes = useStyles();
    const history = useHistory();
    const [booksFiltered, setBooksFiltered] = useState([]);
    const [filteredName, setFilteredName] = useState("");

    const [openPopup, setOpenPopup] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const books = await getAllBooks();
                console.log("Books", books);
                setDouble(books);
            } catch (error) {
                setBooks([]);
            }
        }
        fetchBooks();
    }, [])

    const filterBookNames = e => {
        const { value } = e.target;
        setFilteredName(value);
        const filtered = books.filter(book => book.name.startsWith(value));
        setBooksFiltered(filtered);
    }


    const setDouble = books => {
        setBooks(books);
        setBooksFiltered(books)
    }
    const onDelete = async id => {
        try {
            const message = await deleteBook(id);
            setFilteredName("");
            const newBooks = books.filter(book => book.id !== id);
            setDouble(newBooks);
            alert(message)
        } catch (ex) {
            alert(ex)
        }
    }


    return (
        <React.Fragment>
            <Typography variant="h4"> Books Admin</Typography>
            <TableContainer component={Paper}>
                <SearchComponent
                    placeholder="Search Name"
                    value={filteredName}
                    onChange={filterBookNames}
                />
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Book Name</StyledTableCell>
                            <StyledTableCell align="right">Number of Pages</StyledTableCell>
                            <StyledTableCell align="right">Author Name</StyledTableCell>
                            <StyledTableCell align="right">Publisher Name</StyledTableCell>
                            <StyledTableCell align="right">Amount in Stock</StyledTableCell>
                            <StyledTableCell align="right">Price for One</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {booksFiltered.map((book) => (
                            <StyledTableRow key={book.id}>
                                <StyledTableCell align="right">{book.name}</StyledTableCell>
                                <StyledTableCell align="right">{book.numPages}</StyledTableCell>
                                <StyledTableCell align="right">{book.author}</StyledTableCell>
                                <StyledTableCell align="right">{book.publisher}</StyledTableCell>
                                <StyledTableCell align="right">{book.amount}</StyledTableCell>
                                <StyledTableCell align="right">{book.price}</StyledTableCell>
                                <StyledTableCell>
                                    <Button onClick={() => {
                                        setOpenPopup(true)
                                        setSelectedBook(book)
                                    }}>
                                        Edit
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button style={{ background: "red" }} onClick={async () => await onDelete(book.id)}>
                                        Delete
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button type="link" color="primary" onClick={() => setOpenPopup(true)}>Add Book</Button>
            <BooksPopup allBooks={books} setBook={setSelectedBook} isOpen={openPopup} setIsOpen={setOpenPopup} book={selectedBook} setStringFilter={setFilteredName} setBooksList={setDouble} />
        </React.Fragment>
    )
}

export default BooksAdmin;