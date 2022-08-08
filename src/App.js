import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import ShoppingCart from './pages/ShoppingCart';

import * as api from './services/api';

class App extends Component {
  changeTextoBusca = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    api.getCategories();
    return (
      <BrowserRouter>
        <div>App</div>
        <Route
          exact
          path="/"
          component={ Home }
        />
        <Route exact path="/shoppingCart" component={ ShoppingCart } />
      </BrowserRouter>
    );
  }
}

export default App;
