import React from "react";
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/payment" component={PaymentPage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/" component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
