import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  render() {
    const { onInputChange, fetchApi } = this.props;
    return (
      <div>
        <input
          type="text"
          name="inputText"
          id=""
          data-testid="query-input"
          onChange={ onInputChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ fetchApi }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  fetchApi: PropTypes.func.isRequired,
};
