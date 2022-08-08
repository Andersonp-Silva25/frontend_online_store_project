import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { getProductsFromName } from '../services/api';

export default class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      listaProdutos: [],

    };
  }

    onchangeValue = (e) => {
      this.setState({ input: e.target.value });
    }

    fetchApi = async () => {
      const { input } = this.state;
      const request = await getProductsFromName(input);
      const { results } = request;
      this.setState({ listaProdutos: results });
    }

    // onClickDetails = () => {
    //   const { history } = this.props;
    //   console.log(history.push('/productDetails'));
    // }

    render() {
      const { input, listaProdutos } = this.state;
      return (
        <div>
          <input
            type="text"
            name="input"
            id=""
            data-testid="query-input"
            onChange={ this.onchangeValue }
            value={ input }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.fetchApi }
          >
            Pesquisar

          </button>
          {listaProdutos.length === 0 ? <p>Nenhum produto foi encontrado</p>
            : (listaProdutos.map((produto) => (
              <Link
                to={ `/${produto.id}` }
                key={ produto.id }
                data-testid="product-detail-link"
              >
                <div data-testid="product">
                  <div>
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

                </div>
              </Link>

            ))) }

        </div>
      );
    }
}
