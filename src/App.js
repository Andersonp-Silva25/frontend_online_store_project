import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import ShoppingCart from './pages/ShoppingCart';

import * as api from './services/api';

class App extends Component {
  constructor() {
    super();

    this.state = {
      listaProdutos: [],
      input: '',
    };
  }

  changeTextoBusca = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { listaProdutos, input } = this.state;
    api.getCategories();
    return (
      <BrowserRouter>
        <div>App</div>
        <Route
          exact
          path="/"
          render={ (props) => (
            <Home
              { ...props }
              listaProdutos={ listaProdutos }
              changeValue={ this.changeTextoBusca }
              input={ input }
            />
          ) }
        />
        <Route exact path="/shoppingCart" component={ ShoppingCart } />
      </BrowserRouter>
    );
  }
}

export default App;
