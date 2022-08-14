import React from "react";
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

  const listaGeneros = ["Ação","Aventura","Battle Royale","Corrida","Estratégia","Luta","MMO","MOBA","RPG","Simulação","Sobrevivência"]

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
        navigate("/")
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
          {listaGeneros.map((genero) =>{
            return <option key={genero}>{genero}</option>
          })
          }
          
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