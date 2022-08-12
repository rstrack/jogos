import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import Favicon from "react-favicon"
import { Routes, BrowserRouter, Route, Link } from 'react-router-dom';
import ListJogo from './components/listJogo';
import AddJogo from './components/addJogo';
import Jogo from './components/jogo';

function App() {

  return (
    <div>
      <Favicon src="https://lh3.googleusercontent.com/pw/AL9nZEWQlHchilg8nTGwlUSbokoX1w-KzodbMv_CvwxAeEUJ4Wa0YJOFpPMXYTRFDVPN0A2yI7tIY2Gg4pVKaHjV9jV-oexm_4bHyYCAECh5t3LvHe8WIE2ukYURXDYj4xo8DkmgQaJ-YEMtU2fKsxDApLU=w500-h250-no?authuser=0"></Favicon>
      <BrowserRouter>
      <nav className="navbar navbar-expand-lg ">
          <div className="container">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link to={'/jogos/list'} className="navbar-brand">
              <img classs="img-responsive" width="130px" height="" src="https://lh3.googleusercontent.com/pw/AL9nZEWQlHchilg8nTGwlUSbokoX1w-KzodbMv_CvwxAeEUJ4Wa0YJOFpPMXYTRFDVPN0A2yI7tIY2Gg4pVKaHjV9jV-oexm_4bHyYCAECh5t3LvHe8WIE2ukYURXDYj4xo8DkmgQaJ-YEMtU2fKsxDApLU=w500-h250-no?authuser=0"/>
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
              <ul className='navbar-nav'>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Listar
                  </a>
                  <ul className="dropdown-menu " aria-labelledby="navbarDarkDropdownMenuLink">
                    <Link to={"/jogos/list"} className="dropdown-item">
                      Jogos
                    </Link>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Adicionar
                  </a>
                  <ul className="dropdown-menu " aria-labelledby="navbarDarkDropdownMenuLink">
                    <Link to={"/jogos/add"} className="dropdown-item">
                      Jogos
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
            <Route element={<ListJogo />} path="/jogos/list" />
            <Route element={<AddJogo />} path="/jogos/add" />
            <Route element={<Jogo />} path="/jogos/edit/:id" />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
} export default App
