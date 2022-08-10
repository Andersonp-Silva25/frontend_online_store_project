import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsID } from '../services/api';

class ProductDetails extends Component {
  constructor() {
    super();

    this.state = {
      productName: '',
      productPrice: '',
      image: '',
      details: [],
      cartItem: [],
      obj: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getProductsID(id);
    const { title, price, thumbnail, attributes } = data;
    this.setState({
      productName: title,
      productPrice: price,
      image: thumbnail,
      details: attributes,
      obj: data,
    });
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

  render() {
    const { productName, productPrice, image, details, obj } = this.state;
    return (
      <div>
        <h2>
          <span data-testid="product-detail-name">{productName}</span>
          {' '}
          -
          {' '}
          <span data-testid="product-detail-price">{productPrice}</span>
        </h2>
        <img src={ image } alt={ productName } data-testid="product-detail-image" />
        <div>
          <h4>Especificações Técnicas</h4>
          <ul>
            {details.map((productDetail) => (
              <li key={ productDetail.id + productDetail.value_id }>
                {`${productDetail.name} 
                ${productDetail.value_name === null ? '' : productDetail.value_name}`}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => {
            this.addProductCart(obj);
          } }
        >
          Adicionar ao carrinho

        </button>
        <Link
          to="/shoppingCart"
          data-testid="product-detail-link"
        >
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            {' '}
            Carrinho
            {' '}

          </button>

        </Link>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
