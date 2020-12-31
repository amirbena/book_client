import React, { useState, useEffect } from 'react';
import { TableContainer, TableBody, Table,  Paper, TableHead, TableRow, Typography } from '@material-ui/core'

import { StyledTableCell, StyledTableRow } from './styledTableData';
import { getAllUserPurchases } from '../services/purchaseService'
import useStyles from '../styles/tableStyle';

const UserPurchases = () => {
    const [userPurchases, setUserPurchases] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const fetchUserPurchases = async () => {
            const purchases = await getAllUserPurchases();
            setUserPurchases(purchases);
        }

        fetchUserPurchases();
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h4" >My Purchases</Typography>


            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left" >Book Details: {
                                <React.Fragment>
                                    <StyledTableCell align="right">Name</StyledTableCell>
                                    <StyledTableCell align="right">Amount</StyledTableCell>
                                </React.Fragment>
                            }</StyledTableCell>
                            <StyledTableCell align="right">Total Price</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userPurchases.map((purchase) => (
                            <StyledTableRow key={purchase._id}>
                                <StyledTableCell align="right">
                                    {purchase.booksDetails.map(bookDetails => (
                                        <React.Fragment>
                                            <StyledTableCell align="right">{bookDetails.book.name}</StyledTableCell>
                                            <StyledTableCell align="right">{bookDetails.amount}</StyledTableCell>
                                        </React.Fragment>
                                    ))}
                                </StyledTableCell>
                                <StyledTableCell align="right">{purchase.totalPrice}</StyledTableCell>
                                <StyledTableCell align="right">{new Date(purchase.datePurchased).toLocaleString()}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </React.Fragment>
    );
}

export default UserPurchases;