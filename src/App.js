import React, { Component } from 'react';
import * as api from './services/api';

class App extends Component {
  render() {
    api.getCategories();
    return (
      <div>App</div>
    );
  }
}

export default App;
