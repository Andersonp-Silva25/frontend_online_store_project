import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class PainelProdutos extends Component {
  render() {
    const { inputText, listaProdutos, addProductCart } = this.props;
    return (
      <div>
        {inputText === ''
          ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>)
          : null}
        {listaProdutos.length === 0 ? <p>Nenhum produto foi encontrado</p>
          : (listaProdutos.map((produto) => (
            <div key={ produto.id }>
              <Link
                to={ `/detalhes/${produto.id}` }
                data-testid="product-detail-link"
              >
                <div
                  data-testid="product"
                >
                  <p>
                    {' '}
                    {produto.title}
                    {' '}
                  </p>
                  <img src={ produto.thumbnail } alt={ produto.title } />
                  <span>
                    {' '}
                    {produto.price}
                    {' '}
                  </span>
                </div>
              </Link>
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => {
                  addProductCart(produto);
                } }
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))) }
      </div>
    );
  }
}

PainelProdutos.propTypes = {
  inputText: PropTypes.isRequired,
  listaProdutos: PropTypes.isRequired,
  addProductCart: PropTypes.isRequired,
};

export default PainelProdutos;
