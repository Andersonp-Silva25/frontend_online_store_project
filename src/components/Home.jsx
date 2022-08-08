import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PainelProdutos from './PainelProdutos';
import Header from './Header';
import Categorias from './Categorias';

class Home extends Component {
  render() {
    const { listaProdutos } = this.props;
    return (
      <>
        {/* <Header />
        <Categorias />
        <PainelProdutos listaProdutos={ listaProdutos } /> */}
        <Header { ...this.props } />
        <Categorias { ...this.props } />
        <PainelProdutos { ...this.props } listaProdutos={ listaProdutos } />
      </>
    );
  }
}

Home.propTypes = {
  listaProdutos: PropTypes.arrayOf.isRequired,
};

export default Home;
