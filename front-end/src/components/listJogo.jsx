import React, { useState, useEffect } from "react";
import JogoDataService from "../services/jogoDataService";
import { Link } from "react-router-dom";

<<<<<<< HEAD
function listJogo(){
  const stateJogo = {
    jogos: [""],
    jogoSel: null,
    indice: -1,
    titulo: ""
=======

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
>>>>>>> c01d870a4e77b0931449a18945f1ae6b9c584308
  }

  const [values, setValues] = useState(stateJogo)

  useEffect(() => {
    retrieveJogos()
  }, [])
  

  const handlerOnChange = e => {
    let {name, value} = e.target

    setValues(prevState => ({
        ...prevState,
        [name]: value
    }))
  }

  const retrieveJogos = () => {
    JogoDataService.getAll()
      .then(response => {
        setValues({
          jogos: response.data
        })
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const refreshList = () => {
    retrieveJogos()
    setValues({
      jogoSel: null,
      indice: -1
    })
  }

  const setJogoSel = (jogo, index) => {
    setValues({
      jogoSel: jogo,
      indice: index
    })
  }

  const deleteByID = (id) =>{
    JogoDataService.delete(id)
      .then(response => {
        console.log(response.data)
        refreshList()
      })
      .catch(e => {
        console.log(e)
      });
  }

  const removeAll = () => {
    JogoDataService.deleteAll()
      .then(response => {
        console.log(response.data)
        refreshList()
      })
      .catch(e => {
        console.log(e)
      });
  }

  const searchTitulo = () => {
    console.log(values.titulo)
    setValues({
      jogoSel: null,
      indice: -1
    });

    JogoDataService.findByTitulo(values.titulo)
      .then(response => {
        setValues({
          jogos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por título"
            value={values.titulo}
            onChange={handlerOnChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={searchTitulo}
            >
              Buscar
            </button>
          </div>
        </div>
<<<<<<< HEAD
=======
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
>>>>>>> c01d870a4e77b0931449a18945f1ae6b9c584308
      </div>
      <div className="col-md-6">
        <h4>Jogos</h4>

        <ul className="list-group">
          {values.jogos &&
            values.jogos.map((jogo, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === values.indice ? "active" : "")
                }
                onClick={() => setJogoSel(jogo, index)}
                key={index}
              >
                {jogo.titulo}
              </li>
            ))}
        </ul>

        <button
          className="m-1 btn btn-sm btn-danger"
          onClick={removeAll}>Excluir todos
        </button>
      </div>
      <div className="col-md-6">
        {values.jogoSel ? (
          <div>
            <h4>&nbsp;</h4>
            <div>
              <label>
                <strong>Título:</strong>
              </label>{" "}
              {values.jogoSel.titulo}
            </div>
            <div>
              <label>
                <strong>Gênero:</strong>
              </label>{" "}
              {values.jogoSel.genero}
            </div>
            <div>
              <label>
                <strong>Valor:</strong>
              </label>{" "}
              {values.jogoSel.valor}
            </div>

            <Link
              to={"/jogos/edit/" + values.jogoSel.id}
              className="btn btn-sm btn-warning"
              role="button"
              >
              Editar
            </Link>
            {/* <button 
              className="m-1 btn btn-sm btn-danger"
              onClick={() => deleteByID(jogoSel.id)}
            >
              Deletar
            </button> */}
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
} export default listJogo