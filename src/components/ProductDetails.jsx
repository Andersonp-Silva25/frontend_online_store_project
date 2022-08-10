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
      formEmail: '',
      formDetail: '',
      formRating: 0,
      arrayObjects: [],
      formsValido: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const storage = JSON.parse(localStorage.getItem(id)) || [];
    const data = await getProductsID(id);
    const { title, price, thumbnail, attributes } = data;
    this.setState({
      productName: title,
      productPrice: price,
      image: thumbnail,
      details: attributes,
      obj: data,
      arrayObjects: storage,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  submitLocalStorage = (id) => {
    const { formEmail, formRating, formDetail } = this.state;
    if (/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(formEmail) === false
    || formRating === 0) {
      this.setState({
        formsValido: true,
      });
    } else {
      const objeto = { email: formEmail, rating: formRating, detail: formDetail };
      this.setState((anterior) => ({
        arrayObjects: [...anterior.arrayObjects, objeto],
        formEmail: '',
        formDetail: '',
        formsValido: false,
      }), () => {
        const { arrayObjects } = this.state;
        localStorage.setItem(id, JSON.stringify(arrayObjects));
      });
    }
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
    const { productName,
      productPrice,
      image,
      details,
      obj,
      formEmail,
      formDetail,
      arrayObjects,
      formsValido,
    } = this.state;

    const { match: { params: { id } } } = this.props;
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

        <form action="">
          <input
            data-testid="product-detail-email"
            onChange={ this.onInputChange }
            value={ formEmail }
            type="email"
            name="formEmail"
            id=""
          />
          <input
            data-testid="1-rating"
            onChange={ this.onInputChange }
            type="radio"
            name="formRating"
            value="1"
            id=""
          />
          <input
            data-testid="2-rating"
            onChange={ this.onInputChange }
            type="radio"
            name="formRating"
            value="2"
            id=""
          />
          <input
            data-testid="3-rating"
            onChange={ this.onInputChange }
            type="radio"
            name="formRating"
            value="3"
            id=""
          />
          <input
            data-testid="4-rating"
            onChange={ this.onInputChange }
            type="radio"
            name="formRating"
            value="4"
            id=""
          />
          <input
            data-testid="5-rating"
            onChange={ this.onInputChange }
            type="radio"
            name="formRating"
            value="5"
            id=""
          />
          <textarea
            data-testid="product-detail-evaluation"
            onChange={ this.onInputChange }
            value={ formDetail }
            name="formDetail"
            id=""
            cols="30"
            rows="10"
          />
          <button
            onClick={ () => this.submitLocalStorage(id) }
            data-testid="submit-review-btn"
            type="button"
          >
            Enviar

          </button>
        </form>
        { arrayObjects.length > 0 && arrayObjects.map((elemento) => (
          <div key={ elemento.rating }>
            <p data-testid="review-card-email">{ elemento.email }</p>
            <p data-testid="review-card-rating">{ elemento.rating }</p>
            <p data-testid="review-card-evaluation">{ elemento.detail }</p>
          </div>
        ))}
        { formsValido && <p data-testid="error-msg">Campos inválidos</p> }
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
