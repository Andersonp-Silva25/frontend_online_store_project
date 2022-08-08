import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';

class App extends Component {
  changeTextoBusca = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>App</div>
        <Route
          exact
          path="/"
          component={ Home }
        />
        <Route exact path="/shoppingCart" component={ ShoppingCart } />
        <Route
          exact
          path="/detalhes/:id"
          render={ (props) => <ProductDetails { ...props } /> }
        />
      </BrowserRouter>
    );
  }
}

export default App;
