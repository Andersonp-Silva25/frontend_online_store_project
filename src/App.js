import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PainelProdutos from './components/PainelProdutos';
import * as api from './services/api';

class App extends Component {
  constructor() {
    super();

    this.state = {
      listaProdutos: [],
    };
  }

  changeTextoBusca = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { listaProdutos } = this.state;
    api.getCategories();
    return (
      <BrowserRouter>
        <div>App</div>
        <Route
          exact
          path="/"
          render={ (props) => (
            <PainelProdutos
              { ...props }
              listaProdutos={ listaProdutos }
            />
          ) }
        />
      </BrowserRouter>
    );
  }
}

export default App;
