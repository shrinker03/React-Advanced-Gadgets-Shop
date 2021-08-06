// Importing react module
import React from "react";

// Importing neccessary libraries
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route} from 'react-router-dom'

// Importing Components to render in app.js
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage.js";
import ProductPage from "./pages/ProductPage.js";
import CartPage from "./pages/CartPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import ShippingPage from "./pages/ShippingPage.js";
import PaymentPage from "./pages/PaymentPage.js";
import PlaceOrderPage from "./pages/PlaceOrderPage.js";
import OrderDetailsPage from "./pages/OrderDetailsPage.js";
import UserListPage from "./pages/UserListPage.js";
import UserEditPage from "./pages/UserEditPage.js";
import ProductListPage from "./pages/ProductListPage.js";
import ProductEditPage from "./pages/ProductEditPage.js";
import OrderListPage from "./pages/OrderListPage.js";

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
