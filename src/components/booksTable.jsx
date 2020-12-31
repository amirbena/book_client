import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TableContainer, TableBody, Table, Button, Paper, TableHead, TableRow, Typography } from '@material-ui/core'
import useStyles from '../styles/tableStyle';
import { StyledTableCell, StyledTableRow } from './styledTableData';
import { getAllBooks } from '../services/bookService';
import SearchComponent from './searchComponent'


const BookTable = () => {
    const classes = useStyles();
    const history = useHistory();
    const [books, setBooks] = useState([]);
    const [booksFiltered, setBookFiltered] = useState([]);
    const [filteredName, setFilteredName] = useState("");

    useEffect(() => {
        const fetchAllBooks = async () => {
            const books = await getAllBooks();
            setBooks(books);
            setBookFiltered(books);
        }

        fetchAllBooks();
    }, [])
    const filterBookNames = e => {
        const { value } = e.target;
        setFilteredName(value);
        const filtered = books.filter(book => book.name.startsWith(value));
        setBookFiltered(filtered);
    }
    return (
        <React.Fragment>
            <Typography variant="h1" >Wellcome to Library!</Typography>
            <Typography variant="h2"> Filter book by name</Typography>


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
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button type="link" color="primary" onClick={() =>history.push("/purchase")}>To Purchase Page</Button>

        </React.Fragment>
    );
}

export default BookTable;