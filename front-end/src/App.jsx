import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css'
import ListJogo from './components/listJogo';
import AddJogo from './components/addJogo';
import Jogo from './components/jogo';

function App() {

  return (
    <div>
      <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
          <div className="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <Link to={'/api/jogos/'} className="navbar-brand">
              <b>
                Ciro Games
              </b>
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
              <ul className='navbar-nav'>
                <li className="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Listar
                  </a>
                  <ul class="dropdown-menu dropdown-menu-light bg-danger" aria-labelledby="navbarDarkDropdownMenuLink">
                    <Link to={"/api/jogos/"} className="dropdown-item">
                      Jogos
                    </Link>
                    <Link to={'/api/generos/'} className="dropdown-item">
                      Gêneros
                    </Link>
                  
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Adicionar
                  </a>
                  <ul class="dropdown-menu dropdown-menu-light bg-danger" aria-labelledby="navbarDarkDropdownMenuLink">
                    <Link to={"/api/jogos/add"} className="dropdown-item">
                      Jogos
                    </Link>
                    <Link to={'/api/generos/add'} className="dropdown-item">
                      Gêneros
                    </Link>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route element={<ListJogo />} path="/" />
            <Route element={<ListJogo />} path="/api/jogos/" />
            <Route element={<AddJogo />} path="/api/jogos/add" />
            <Route element={<Jogo />} path="/api/jogos/:id" />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
