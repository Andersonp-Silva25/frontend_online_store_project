import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      produtos: [],
      inputName: '',
      inputEmail: '',
      inputCpf: '',
      inputTelefone: '',
      inputCep: '',
      inputEndereco: '',
      inputPagamento: '',
      errorMsg: false,
    };
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('cartItem'));
    if (storage === null) {
      this.setState({ produtos: [] });
    } else {
      this.setState({ produtos: storage });
    }
  }

  changeTextoBusca = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  subimitButton = (event) => {
    event.preventDefault();

    const {
      inputName,
      inputEmail,
      inputCpf,
      inputTelefone,
      inputCep,
      inputEndereco,
      inputPagamento,
    } = this.state;

    const { history } = this.props;

    const verify = (
      inputName.length === 0
      || inputEmail.length === 0
      || inputCpf.length === 0
      || inputTelefone.length === 0
      || inputCep.length === 0
      || inputEndereco.length === 0
      || inputPagamento.length === 0
    );

    if (verify) {
      this.setState({ errorMsg: true });
    } else {
      this.setState({ errorMsg: false });
      localStorage.removeItem('cartItem');
      history.push('/');
    }
  }

  render() {
    const {
      produtos,
      errorMsg,
    } = this.state;
    // console.log(inputPagamento);
    return (
      <div>
        <div>
          <h3>Revise os Produtos</h3>
          {produtos.map((produto) => (
            <div key={ produto.id }>
              <img src={ produto.thumbnail } alt={ produto.name } />
              <p>{produto.title}</p>
              <p>{produto.qtd}</p>
              <p>{produto.qtd * produto.price}</p>
            </div>
          ))}
          <p>
            Total:
            {' '}
            { produtos.reduce((acc, produto) => acc + (produto.qtd * produto.price), 0) }
          </p>
        </div>
        <div>
          <form>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                id="name"
                data-testid="checkout-fullname"
                onChange={ this.changeTextoBusca }
                name="inputName"
              />
            </label>
            <br />
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                data-testid="checkout-email"
                onChange={ this.changeTextoBusca }
                name="inputEmail"
              />
            </label>
            <br />
            <label htmlFor="cpf">
              CPF:
              <input
                type="text"
                id="cpf"
                data-testid="checkout-cpf"
                onChange={ this.changeTextoBusca }
                name="inputCpf"
              />
            </label>
            <br />
            <label htmlFor="telefone">
              Telefone:
              <input
                type="text"
                id="telefone"
                data-testid="checkout-phone"
                onChange={ this.changeTextoBusca }
                name="inputTelefone"
              />
            </label>
            <br />
            <label htmlFor="cep">
              CEP:
              <input
                type="text"
                id="cep"
                data-testid="checkout-cep"
                onChange={ this.changeTextoBusca }
                name="inputCep"
              />
            </label>
            <br />
            <label htmlFor="endereco">
              Endereço:
              <input
                type="text"
                id="endereco"
                data-testid="checkout-address"
                onChange={ this.changeTextoBusca }
                name="inputEndereco"
              />
            </label>
            <p>Formas de Pagamento</p>
            <label htmlFor="boleto">
              Boleto
              <input
                type="radio"
                id="boleto"
                name="inputPagamento"
                data-testid="ticket-payment"
                value="boleto"
                onChange={ this.changeTextoBusca }
              />
            </label>
            <label htmlFor="visa">
              Visa
              <input
                type="radio"
                id="visa"
                name="inputPagamento"
                data-testid="visa-payment"
                value="visa"
                onChange={ this.changeTextoBusca }
              />
            </label>
            <label htmlFor="mastercard">
              MasterCard
              <input
                type="radio"
                id="mastercard"
                name="inputPagamento"
                data-testid="master-payment"
                value="mastercard"
                onChange={ this.changeTextoBusca }
              />
            </label>
            <label htmlFor="elo">
              Elo
              <input
                type="radio"
                id="elo"
                name="inputPagamento"
                data-testid="elo-payment"
                value="elo"
                onChange={ this.changeTextoBusca }
              />
            </label>
            <button
              type="button"
              data-testid="checkout-btn"
              onClick={ this.subimitButton }
            >
              Confirmar

            </button>
            <span>
              {errorMsg && <p data-testid="error-msg">Campos inválidos</p>}
            </span>
          </form>
        </div>

      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
