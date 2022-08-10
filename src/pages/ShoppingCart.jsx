import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ShoppingCart extends Component {
  state = {
    produtos: [],
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('cartItem'));
    if (storage === null) {
      this.setState({ produtos: [] });
    } else {
      this.setState({ produtos: storage });
    }
  }

  teste = () => {
    const { produtos } = this.state;
    localStorage.setItem('cartItem', JSON.stringify(produtos));
  }

  soma = (id) => {
    const { produtos } = this.state;
    const listaFiltrada = produtos.filter((elemento) => elemento.id !== id.id);
    const object = { ...id };
    if (object.qtd < object.available_quantity) {
      object.qtd += 1;
    } else {
      return object.qtd;
    }
    this.setState({
      produtos: [...listaFiltrada, object],
    }, this.teste);
  }

  subtrai = (id) => {
    const { produtos } = this.state;
    const listaFiltrada = produtos.filter((elemento) => elemento.id !== id.id);
    const object = { ...id };
    object.qtd -= 1;
    this.setState({
      produtos: [...listaFiltrada, object],
    }, this.teste);
  }

  remove = (id) => {
    const { produtos } = this.state;
    const novoArray = produtos.filter((elemento) => elemento.id !== id);
    this.setState({
      produtos: novoArray,
    }, this.teste);
  }

  render() {
    const { produtos } = this.state;
    return (
      <div>
        { produtos.length === 0 ? (
          <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio </p>)
          : (produtos.map((product, index) => (
            <div key={ product.id }>
              <li>
                <img src={ product.thumbnail } alt={ product.title } />
                <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
                <button
                  onClick={ () => this.soma(product) }
                  data-testid="product-increase-quantity"
                  type="button"
                >
                  +

                </button>
                <p data-testid="shopping-cart-product-quantity">
                  { produtos[index].qtd }

                </p>
                <button
                  onClick={ () => this.subtrai(product) }
                  data-testid="product-decrease-quantity"
                  type="button"
                >
                  -

                </button>
                <button
                  onClick={ () => this.remove(product.id) }
                  data-testid="remove-product"
                  type="button"
                >
                  remove
                </button>
              </li>
            </div>

          )))}
        <p>
          { produtos.reduce((acc, elemento) => acc + elemento.qtd, 0) }
        </p>
        <Link to="/checkout" data-testid="checkout-products">
          <button type="button">Comprar</button>
        </Link>
      </div>
    );
  }
}
