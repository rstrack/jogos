import React, {useState, useEffect} from "react";
import JogoDataService from "../services/jogoDataService";

import { useNavigate, useParams } from 'react-router-dom';

function EditJogo(){

  const stateJogo = {
    mensagem: "",
    JogoAtual: {
      id: null,
      titulo: "",
      genero: "Ação",
      valor:""
    }
  }

  const listaGeneros = ["Ação","Aventura","Battle Royale","Corrida","Estratégia","Luta","MMO","MOBA","RPG","Simulação","Sobrevivência"]

  const [values, setValues] = useState(stateJogo)

  const params = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    getJogo(params.id);
    console.log(params.id)
  }, [])

  const onChangeTitulo = e => {
    const titulo = e.target.value;

    setValues(prevState => ({
        ...prevState,
        JogoAtual: {
          ...prevState.JogoAtual,
          titulo: titulo
        }
    }))
  }

  const onChangeGenero = e => {
    const gen = e.target.value;

    setValues(prevState => ({
        ...prevState,
        JogoAtual: {
          ...prevState.JogoAtual,
          genero: gen
        }
    }))
  }

  const onChangeValor = e => {
    const val = e.target.value;

    setValues(prevState => ({
        ...prevState,
        JogoAtual: {
          ...prevState.JogoAtual,
          valor: val
        }
    }))
  }

  const getJogo = (id) => {
    JogoDataService.get(id)
      .then(response => {
        console.log(response.data)
        setValues({
          JogoAtual: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        
        console.log("Erro: "+e);
      });
  }

  const updateJogo = () => {
    JogoDataService.update(
      values.JogoAtual.id,
      values.JogoAtual
    )
      .then(response => {
        console.log(response.data);
        navigate("/")
      })
      .catch(e => {
        console.log(e);
      });
  }

  const deleteJogo = () =>{    
    JogoDataService.delete(values.JogoAtual.id)
      .then(response => {
        console.log(response.data)
        navigate("/")
      })
      .catch(e => {
        console.log(e)
      })
  }
  return (
    <div>
      <div className="edit-form">
        <h4>Jogo</h4>
        <form>
            <div className="form-group">
                <label htmlFor="titulo"><strong>Título</strong></label>
                <input
                type="text"
                className="form-control"
                id="titulo"
                value={values.JogoAtual.titulo}
                onChange={onChangeTitulo}
                />
            </div>
            <div className="form-group">
                <label htmlFor="genero"><strong>Gênero</strong></label>
                <select
                type="text"
                className="form-control"
                id="genero"
                value={values.JogoAtual.genero}
                onChange={onChangeGenero}
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
                type="text"
                className="form-control"
                id="valor"
                value={values.JogoAtual.valor}
                onChange={onChangeValor}
                />
            </div>
        </form>
        <button
        className="m-2 btn btn-sm btn-danger mr-2"
        onClick={deleteJogo}
        >
        Excluir
        </button>
        <button
        type="submit"
        className="m-2 btn btn-sm btn-success"
        onClick={updateJogo}
        >
        Atualizar
        </button>
      </div>
    </div>
  );
}
export default EditJogo;