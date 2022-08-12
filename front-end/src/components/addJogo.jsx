import React, { Component } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JogoDataService from "../services/jogoDataService";

const AddJogo = () => {
  const navigate = useNavigate();
  
  const stateJogo = {
    titulo: "",
    genero: "Ação", 
    valor:""
  }

  const [values, setValues] = useState(stateJogo)

  const handlerOnChange = e => {
    let {name, value} = e.target

    setValues(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handlerEnvio = () => {
    JogoDataService.create(values)
      .then(response => {
        console.log(response.data)
        navigate("/jogos/list")
      })
      .catch(e => {
        console.log(e);
      });
  }


  return (
    <div className="submit-form">
      <div className="form-group">
        <label htmlFor="titulo"><strong>Título</strong></label>
        <input
          className="form-control"
          required
          value={values.titulo}
          onChange={handlerOnChange}
          name="titulo"
        />
      </div>

      <div className="form-group">
        <label htmlFor="genero"><strong>Gênero</strong></label>
        <select
          className="form-control"
          required
          value={values.genero}
          onChange={handlerOnChange}
          name="genero"
        >
          <option value="Ação">Ação</option>
          <option value="Aventura">Aventura</option>
          <option value="Battle Royale">Battle Royale</option>
          <option value="Corrida">Corrida</option>
          <option value="Estratégia">Estratégia</option>
          <option value="FPS">FPS</option>
          <option value="Luta">Luta</option>
          <option value="MMO">MMO</option>
          <option value="MOBA">MOBA</option>
          <option value="RPG">RPG</option>
          <option value="Simulação">Simulação</option>
          <option value="Sobrevivência">Sobrevivência</option>
        </select>
            
      </div>
      <div className="form-group">
        <label htmlFor="valor"><strong>Valor</strong></label>
        <input
          placeholder="R$ 0,00"
          className="form-control"
          required
          value={values.valor}
          onChange={handlerOnChange}
          name="valor"
        />
      </div>
      <div className="col text-center">
        <button onClick={handlerEnvio} className="btn btn-success">
          Enviar
        </button>
      </div>
    </div>
  )
}

export default AddJogo