import serverInstance from './serverInstance';
import { bookRebuild } from './bookService';


const baseUrl = 'purchases';


const createPurchase = async (booksList, totalPrice) => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
        const response = await serverInstance.post(baseUrl, {
            totalPrice, booksList
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const { newPurchase, bookNamesNotAvailable, message } = response.data;
        return {
            purchase: buildPurchase(newPurchase),
            bookNamesNotAvailable,
            message
        }

    } catch (ex) {
        throw ex.response.data;
    }
}

const getAllPurchases = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await serverInstance.get(`${baseUrl}/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const allPurchases = response.data.allPurchases.map(purchase => buildPurchase(purchase));
        return allPurchases;

    } catch (ex) {
        throw ex.response.data;
    }
}

const getAllUserPurchases = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await serverInstance.get(baseUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const userPurchases = response.data.userPurchases.map(purchase => buildPurchase(purchase));
        return userPurchases;

    } catch (ex) {
        throw ex.response.data;
    }
}

const buildPurchase = purchase => {

    const { booksDetails } = purchase;
    const newBooks = booksDetails.map(bookDetails => {
        const book = bookRebuild(bookDetails.book);
        return { ...bookDetails, book };
    })
    return { ...purchase, booksDetails:newBooks };
}

export { createPurchase };
export { getAllPurchases }
export { getAllUserPurchases };