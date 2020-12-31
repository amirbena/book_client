import serverInstance from './serverInstance';



const baseUrl = 'books';

const createBook = async (bookState) => {
    const token = localStorage.getItem("token");
    try {
        const response = await serverInstance.post(`${baseUrl}/`, bookState, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const { book: bookToRebuild, message } = response.data;
        const book = bookRebuild(bookToRebuild);
        return { book, message };
    } catch (ex) {
        throw ex.response.data;
    }
}

const getAllBooks = async () => {
    try {
        const response = await serverInstance.get(`${baseUrl}/`);
        const books = response.data.books.map(book => bookRebuild(book));
        return books;
    } catch (ex) {
        throw ex.response.data;
    }
}


const updateBook = async (id, bookState) => {
    const token = localStorage.getItem("token");
    try {
        const response = await serverInstance.put(`${baseUrl}/${id}`, bookState, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const book = bookRebuild(response.data.updatedBook);
        return { ...response.data, book }
    } catch (ex) {
        throw ex.response.data;
    }
}


const deleteBook = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await serverInstance.delete(`${baseUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
   
        return response.data;
    } catch (ex) {
        throw ex.response.data;
    }
}

const bookRebuild = book => {
    const { _id: id, name, numPages, publisher: publisherObj, author: authorObj, price,amount } = book;
    const { publisherName: publisher } = publisherObj;
    const { authorName: author } = authorObj;
    return {
        id,
        name,
        publisher,
        author,
        amount,
        numPages,
        price
    }
}


export { bookRebuild };
export { createBook };
export { updateBook };
export { getAllBooks };
export { deleteBook }; 