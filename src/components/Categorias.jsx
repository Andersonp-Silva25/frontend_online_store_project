import React, { Component } from 'react';
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
    const { categories } = this.state;
    return (
      <div>
        <h1>Categorias</h1>
        {categories.map((categorie) => (
          <button
            type="button"
            key={ categorie.id }
            data-testid="category"
          >

            {' '}
            {categorie.name}
            {' '}
          </button>))}

      </div>
    );
  }
}
