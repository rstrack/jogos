import React, { Component } from "react";
import JogoDataService from "../services/jogoDataService";

export default class AddJogo extends Component {

  constructor(props) {
    super(props);

    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeGenero = this.onChangeGenero.bind(this);
    this.onChangeValor = this.onChangeValor.bind(this);
    this.saveJogo = this.saveJogo.bind(this);
    this.newJogo = this.newJogo.bind(this);    

    this.state = {
        id: null,
        titulo: "",
        genero: "", 
        valor:"",
        enviado: false
      };
  } 

  onChangeTitulo(e) {
    this.setState({
      titulo: e.target.value
    });
  }

  onChangeGenero(e) {
    this.setState({
      genero: e.target.value
    });
  }

  onChangeValor(e) {
    this.setState({
      valor: e.target.value
    });
  }

  saveJogo() {
    var data = {
      titulo: this.state.titulo,
      genero: this.state.genero
    };

    ArtigoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          titulo: response.data.titulo,
          genero: response.data.genero,

          enviado: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newJogo() {
    this.setState({
      id: null,
      titulo: "",
      genero: "",
      enviado: false
    });
  }

  render() {
    return (
        <div className="submit-form">
            { this.state.enviado ? (
              <div>
              <h4>O jogo foi enviado com sucesso!</h4>
              <button className="btn btn-success" onClick={this.newJogo}>
                Adicionar outro jogo
              </button>
            </div>
              
            ) : (
              <div>
              <div className="form-group">
                <label htmlFor="titulo"><strong>Título</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  required
                  value={this.state.titulo}
                  onChange={this.onChangeTitulo}
                  name="titulo"
                />
              </div>
    
              <div className="form-group">
                <label htmlFor="genero"><strong>Gênero</strong></label>
                <select
                  className="form-control"
                  id="genero"
                  required
                  value={this.state.genero}
                  onChange={this.onChangeGenero}
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
                  id="valor"
                  required
                  value={this.state.valor}
                  onChange={this.onChangeValor}
                  name="valor"
                />
              </div>
              <div className="col text-center">
                <button onClick={this.saveJogo} className="btn btn-success">
                  Enviar
                </button>
              </div>
              </div>
            )}
        </div>
    )
  } 
}