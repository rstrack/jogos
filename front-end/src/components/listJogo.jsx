import React, { Component } from "react";
import JogoDataService from "../services/jogoDataService";
import { Link } from "react-router-dom";


export default class ListJogo extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitulo = this.onChangeSearchTitulo.bind(this);
    this.retrieveJogos = this.retrieveJogos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setJogoSel = this.setJogoSel.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.searchTitulo = this.searchTitulo.bind(this);

    this.state = {
      jogos: [],
      jogoSel: null,
      indice: -1,
    };
  }

  componentDidMount() {
    this.retrieveJogos();
  }

  onChangeSearchTitulo(e) {
    const searchTitulo = e.target.value;

    this.setState({
      titulo: searchTitulo
    });
  }

  retrieveJogos() {
    JogoDataService.getAll()
      .then(response => {
        this.setState({
          jogos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveJogos();
    this.setState({
      jogoSel: null,
      indice: -1
    });
  }

  setJogoSel(jogo, index) {
    this.setState({
      jogoSel: jogo,
      indice: index
    });
  }

  removeAll() {
    JogoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitulo() {
    this.setState({
      jogoSel: null,
      indice: -1
    });

    JogoDataService.findByTitulo(this.state.titulo)
      .then(response => {
        this.setState({
          jogos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { titulo, jogos, jogoSel, indice } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por título"
              value={titulo}
              onChange={this.onChangeSearchTitulo}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitulo}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Jogos</h4>

          <ul className="list-group">
            {jogos &&
              jogos.map((jogo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === indice ? "active" : "")
                  }
                  onClick={() => this.setJogoSel(jogo, index)}
                  key={index}
                >
                  {jogo.titulo}
                </li>
              ))}
          </ul>

          <button
            className="m-1 btn btn-sm btn-danger"
            onClick={this.removeAll}>Excluir todos
          </button>
        </div>
        <div className="col-md-6">
          {jogoSel ? (
            <div>
              <h4>&nbsp;</h4>
              <div>
                <label>
                  <strong>Título:</strong>
                </label>{" "}
                {jogoSel.titulo}
              </div>
              <div>
                <label>
                  <strong>Gênero:</strong>
                </label>{" "}
                {jogoSel.genero.nome}
              </div>
              <div>
                <label>
                  <strong>Valor:</strong>
                </label>{" "}
                {jogoSel.valor}
              </div>

              <Link
                to={"/api/jogos/" + jogoSel.id}
                className="btn btn-sm btn-warning"
                role="button"
                >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <h4>&nbsp;</h4>
              
              <p><i>Para detalhes, selecionar um jogo.</i></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}