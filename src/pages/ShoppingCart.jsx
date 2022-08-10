import React, { Component } from 'react';

export default class ShoppingCart extends Component {
  state = {
    produtos: [],
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('cartItem')) || [];
    this.setState({ produtos: storage });
  }

  render() {
    const { produtos } = this.state;
    return (
      <div>
        { produtos.length === 0 ? (
          <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio </p>)
          : (produtos.map((product) => (
            <div key={ product.id }>
              <li>
                <img src={ product.thumbnail } alt={ product.title } />
                <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
                <p>{ product.price }</p>
              </li>
              <p data-testid="shopping-cart-product-quantity">
                { produtos.length }
              </p>
            </div>

          )))}
      </div>
    );
  }
}
