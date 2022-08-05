import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      textoBusca: '',
      listaProducts: [],
    };
  }

  changeTextoBusca = ({ target }) => {
    this.setState({
      textoBusca: target.value,
    });
  }

  render() {
    const { textoBusca, listaProducts } = this.state;
    return (
      <div>
        <input
          type="text"
          onChange={ this.changeTextoBusca }
          value={ textoBusca }
        />
        {listaProducts.length === 0
          ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>)
          : null}
      </div>
    );
  }
}

export default Search;
