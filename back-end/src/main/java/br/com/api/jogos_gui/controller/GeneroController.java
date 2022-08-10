package br.com.api.jogos_gui.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.jogos_gui.modelo.Genero;
import br.com.api.jogos_gui.repository.GeneroRepository;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api")
public class GeneroController {
    
    @Autowired
    GeneroRepository rep;

    /*
     * GET /api/generos : listar todos os generos
     */
    @GetMapping("/generos")
    public ResponseEntity<List<Genero>> getAllGeneros(@RequestParam(required = false) String nome) {
        try {
            List<Genero> listaGeneros = new ArrayList<Genero>();

            if (nome == null)
                rep.findAll().forEach(listaGeneros::add);
            else
                rep.findByNomeContaining(nome).forEach(listaGeneros::add);

            if (listaGeneros.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(listaGeneros, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * POST /api/generos : criar artigo
     */
    @PostMapping("/generos")
    public ResponseEntity<Genero> createGenero(@RequestBody Genero genero) {
        try {
            Genero _j = rep.save(new Genero(genero.getId(), genero.getNome(), genero.getClassificacaoIndicativa()));

            return new ResponseEntity<>(_j, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * GET /api/generos/:id : listar artigo dado um id
     */
    @GetMapping("/generos/{id}")
    public ResponseEntity<Genero> getGeneroById(@PathVariable("id") long id) {
        Optional<Genero> data = rep.findById(id);

        if (data.isPresent())
            return new ResponseEntity<>(data.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /*
     * PUT /api/generos/:id : atualizar artigo dado um id
     */
    @PutMapping("/generos/{id}")
    public ResponseEntity<Genero> updateGenero(@PathVariable("id") long id, @RequestBody Genero g) {
        Optional<Genero> data = rep.findById(id);

        if (data.isPresent()) {
            Genero _g = data.get();
            _g.setNome(g.getNome());
            _g.setClassificacaoIndicativa(g.getClassificacaoIndicativa());

            return new ResponseEntity<>(rep.save(_g), HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    /*
     * DEL /api/generos/:id : remover artigo dado um id
     */
    @DeleteMapping("/generos/{id}")
    public ResponseEntity<HttpStatus> deleteGenero(@PathVariable("id") long id) {
        try {
            rep.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * DEL /api/generos : remover todos os generos
     */
    @DeleteMapping("/generos")
    public ResponseEntity<HttpStatus> deleteAllGenero() {
        try {
            rep.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
