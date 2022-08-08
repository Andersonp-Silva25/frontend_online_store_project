import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class Categorias extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const request = await getCategories();
    this.setState({ categories: request });
  }

  render() {
    const { fetchCategoriasParam } = this.props;
    const { categories } = this.state;
    return (
      <div>
        <h1>Categorias</h1>
        {categories.map((categorie) => (
          <button
            name="categoriaId"
            type="button"
            key={ categorie.id }
            data-testid="category"
            value={ categorie.id }
            onClick={ () => fetchCategoriasParam(categorie.id) }
          >

            {' '}
            {categorie.name}
            {' '}
          </button>))}

      </div>
    );
  }
}

Categorias.propTypes = {
  fetchCategoriasParam: PropTypes.func.isRequired,
//  categoriaId: PropTypes.isRequired,
};
