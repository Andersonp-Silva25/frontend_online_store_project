import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PainelProdutos extends Component {
  render() {
    const { listaProdutos } = this.props;
    return (
      <div>
        {listaProdutos.length === 0
          ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>)
          : null}
      </div>
    );
  }
}

PainelProdutos.propTypes = {
  listaProdutos: PropTypes.isRequired,
};

export default PainelProdutos;
