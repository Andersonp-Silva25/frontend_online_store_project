import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PainelProdutos from './PainelProdutos';
import Search from './Search';
import Categorias from './Categorias';
import { getProductsFromName, getProductsFromCategory } from '../services/api';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      inputText: '',
      listaProdutos: [],
      categoriaId: '',
    };
  }

  fetchCategoriasParam = async (categoriaId) => {
    const request = await getProductsFromCategory(categoriaId);
    const { results } = request;
    this.setState({ listaProdutos: results });
  }

  fetchApi = async () => {
    const { inputText } = this.state;
    const request = await getProductsFromName(inputText);
    const { results } = request;
    this.setState({ listaProdutos: results });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { listaProdutos, inputText, categoriaId } = this.state;
    return (
      <>
        <Search
          onInputChange={ this.onInputChange }
          fetchApi={ this.fetchApi }
          inputText={ inputText }
        />
        <Link
          to="/shoppingCart"
          data-testid="shopping-cart-button"
        >
          <button type="button"> Carrinho </button>

        </Link>
        <Categorias
          fetchCategoriasParam={ this.fetchCategoriasParam }
          categoriaId={ categoriaId }
        />
        <PainelProdutos
          { ...this.props }
          inputText={ inputText }
          listaProdutos={ listaProdutos }
        />
      </>
    );
  }
}

Home.propTypes = {
  listaProdutos: PropTypes.arrayOf.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Home;
