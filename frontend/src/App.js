// Importing react module
import React from "react";

// Importing neccessary libraries
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route} from 'react-router-dom'

// Importing Components to render in app.js
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage,jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";
import UserListPage from "./pages/UserListPage.jsx";
import UserEditPage from "./pages/UserEditPage.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";
import ProductEditPage from "./pages/ProductEditPage.jsx";
import OrderListPage from "./pages/OrderListPage.jsx";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/order/:id" component={OrderDetailsPage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/admin/userlist" component={UserListPage} />
          <Route path="/admin/productlist" component={ProductListPage} exact />
          <Route path="/admin/productlist/:pageNumber" component={ProductListPage} exact />
          <Route path="/admin/orderlist" component={OrderListPage} />
          <Route path="/admin/user/:id/edit" component={UserEditPage} />
          <Route path="/admin/product/:id/edit" component={ProductEditPage} />
          <Route path="/search/:keyword" component={HomePage} exact />
          <Route path="/page/:pageNumber" component={HomePage} exact />
          <Route path="/search/:keyword/page/:pageNumber" component={HomePage} exact />
          <Route path="/" component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
