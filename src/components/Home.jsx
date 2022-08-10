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
      cartItem: [],
    };
  }

  addProductCart = (item) => {
    const object = { ...item, qtd: 1 };

    this.setState((prevState) => ({
      cartItem: [...prevState.cartItem, object],
    }
    ), () => {
      const { cartItem } = this.state;
      localStorage.setItem('cartItem', JSON.stringify(cartItem));
    });
    const { cartItem } = this.state;
    const teste = cartItem.some((elemento) => elemento.id === object.id);

    if (teste) {
      const lista = cartItem.map((elemento) => {
        if (elemento.id === object.id) {
          return { ...elemento, qtd: elemento.qtd + 1 };
        }
        return elemento;
      });
      this.setState({
        cartItem: lista,
      }, () => {
        localStorage.setItem('cartItem', JSON.stringify(cartItem));
      });
    }
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
    const { listaProdutos, inputText, categoriaId, cartItem } = this.state;
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
          cartItem={ cartItem }
          addProductCart={ this.addProductCart }
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
