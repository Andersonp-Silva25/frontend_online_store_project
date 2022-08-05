import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './components/Search';
import * as api from './services/api';

class App extends Component {
  render() {
    api.getCategories();
    return (
      <BrowserRouter>
        <div>App</div>
        <Route exact path="/" component={ Search } />
      </BrowserRouter>
    );
  }
}

export default App;
