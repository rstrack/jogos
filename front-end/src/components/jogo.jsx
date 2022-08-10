import React, { Component } from "react";
import JogoDataService from "../services/jogoDataService";

import { useParams } from 'react-router-dom';

// Para obter parâmetros passados via Router v6
// Ex.: (em) this.props.match.params.id
export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
 }

class Jogo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeGenero = this.onChangeGenero.bind(this);
    this.onChangevalor = this.onChangeValor.bind(this);
    this.getJogo = this.getJogo.bind(this);
    this.updateJogo = this.updateJogo.bind(this);
    this.deleteJogo = this.deleteJogo.bind(this);

    this.state = {
      JogoAtual: {
        id: null,
        titulo: "",
        genero: "",
      },
      mensagem: ""
    };
  }
  
  componentDidMount() {

    this.getJogo(this.props.match.params.id);
  }

  onChangeTitulo(e) {
    const titulo = e.target.value;

    this.setState(function(prevState) {
      return {
        JogoAtual: {
          ...prevState.JogoAtual,
          titulo: titulo
        }
      };
    });
  }

  onChangeGenero(e) {
    const genero = e.target.value;
    
    this.setState(prevState => ({
      JogoAtual: {
        ...prevState.JogoAtual,
        genero: genero
      }
    }));
  }

  getJogo(id) {
    JogoDataService.get(id)
      .then(response => {
        this.setState({
          JogoAtual: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        
        console.log("Erro: "+e);
      });
  }


  updateJogo() {
    JogoDataService.update(
      this.state.JogoAtual.id,
      this.state.JogoAtual
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          mensagem: "Jogo atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteJogo() {    
    JogoDataService.delete(this.state.JogoAtual.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/list')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { JogoAtual } = this.state;

    return (
      <div>
        {JogoAtual ? (
            <div className="edit-form">
                <h4>Jogo</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="titulo"><strong>Título</strong></label>
                        <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        value={JogoAtual.titulo}
                        onChange={this.onChangeTitulo}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genero"><strong>Gênero</strong></label>
                        <input
                        type="text"
                        className="form-control"
                        id="genero"
                        value={JogoAtual.genero}
                        onChange={this.onChangeGenero}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="valor"><strong>Valor</strong></label>
                        <input
                        type="text"
                        className="form-control"
                        id="valor"
                        value={JogoAtual.valor}
                        onChange={this.onChangeValor}
                        />
                    </div>
                </form>
                <button
                className="m-2 btn btn-sm btn-danger mr-2"
                onClick={this.deleteJogo}
                >
                Excluir
                </button>
                <button
                type="submit"
                className="m-2 btn btn-sm btn-success"
                onClick={this.updateJogo}
                >
                Atualizar
                </button>
                <p>{this.state.mensagem}</p>
            </div>
        ) : (
          <div>
            <br />
            <p><i>Para detalhes, selecionar um jogo.</i></p>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Jogo);