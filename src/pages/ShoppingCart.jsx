import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      listCart: [],
    };
  }

  render() {
    const { listCart } = this.state;
    return (
      <div>
        { listCart.length === 0 ? (
          <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio </p>)
          : (listCart.map((product) => (
            <li key={ product.id }>
              <img src={ product.thumbnail } alt={ product.title } />
              <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
              <p>{ product.price }</p>
              <p data-testid="shopping-cart-product-quantity">{ product.quant }</p>
            </li>
          )))}
      </div>
    );
  }
}
