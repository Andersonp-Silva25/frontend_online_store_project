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
    });
  }

  render() {
    const { productName, productPrice, image, details } = this.state;
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

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
