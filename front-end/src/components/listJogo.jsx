import React, { useState, useEffect } from "react";
import JogoDataService from "../services/jogoDataService";
import { Link } from "react-router-dom";

function listJogo(){
  const stateJogo = {
    jogos: [],
    jogoSel: null,
    indice: -1,
    titulo: ""
  }

  const [values, setValues] = useState(stateJogo)

  useEffect(() => {
    retrieveJogos()
  }, [])
  

  const handlerOnChange = e => {
    let {value} = e.target

    setValues({
        ...values,
        titulo: value
    })
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
      ...values,
      jogoSel: null,
      indice: -1
    })
  }

  const setJogoSel = (jogo, index) => {
    setValues({
      ...values,
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
      ...values,
      jogoSel: null,
      indice: -1
    });

    JogoDataService.findByTitulo(values.titulo)
      .then(response => {
        setValues({
          ...values,
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

            className="form-control"
            placeholder="Buscar por título"
            value={values.titulo}
            onChange={handlerOnChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              onClick={searchTitulo}
            
            >
              Buscar
            </button>
          </div>
        </div>
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
            <button 
              className="m-1 btn btn-sm btn-danger"
              onClick={() => deleteByID(values.jogoSel.id)}
            >
              Deletar
            </button>
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