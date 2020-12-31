import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import { Container } from '@material-ui/core';
import BooksTable from './components/booksTable';
import Signup from './components/signup';
import Login from './components/login';
import Navbar from './components/navbar';
import AddPurchase from './components/addPurchase';
import UserPurchases from './components/userPurchases';
import AllPurchases from './components/allPurchases';
import BooksAdmin from './components/booksAdmin';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container fixed style={{ marginTop: "40px" }}>
        <Switch>
          <Route path="/home" render={() => <BooksTable />} />
          <Route path="/signup" render={() => <Signup />} />
          <Route path="/login" render={() => <Login />} />
          <ProtectedRoute path="/purchase" render={() => <AddPurchase />} />
          <ProtectedRoute path="/userPurchases" render={() => <UserPurchases />} />
          <ProtectedRoute path="/allPurchases" admin render={() => <AllPurchases />} />
          <ProtectedRoute path="/books" admin render={() => <BooksAdmin />} />
          <Redirect from='/' exact to='/home' />
        </Switch>
      </Container>


    </div>
  );
}

export default App;
