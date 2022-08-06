import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './Search';

export default class Header extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <Link
          to="/shoppingCart"
          data-testid="shopping-cart-button"
        >
          <button type="button"> Carrinho </button>

        </Link>
      </div>
    );
  }
}
