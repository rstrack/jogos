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

import br.com.api.jogos_gui.modelo.Jogo;
import br.com.api.jogos_gui.repository.JogoRepository;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api")
public class JogoController {

    @Autowired
    JogoRepository rep;

    /*
     * GET /api/jogos : listar todos os jogos
     */
    @GetMapping("/jogos")
    public ResponseEntity<List<Jogo>> getAllJogos(@RequestParam(required = false) String nome) {
        try {
            List<Jogo> listaJogos = new ArrayList<Jogo>();

            if (nome == null)
                rep.findAll().forEach(listaJogos::add);
            else
                rep.findByTituloContaining(nome).forEach(listaJogos::add);

            if (listaJogos.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(listaJogos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * POST /api/jogos : criar artigo
     */
    @PostMapping("/jogos")
    public ResponseEntity<Jogo> createJogo(@RequestBody Jogo jogo) {
        try {
            Jogo _j = rep.save(new Jogo(jogo.getId(), jogo.getTitulo(), jogo.getValor(), jogo.getGenero()));

            return new ResponseEntity<>(_j, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * GET /api/jogos/:id : listar artigo dado um id
     */
    @GetMapping("/jogos/{id}")
    public ResponseEntity<Jogo> getJogoById(@PathVariable("id") long id) {
        Optional<Jogo> data = rep.findById(id);

        if (data.isPresent())
            return new ResponseEntity<>(data.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /*
     * PUT /api/jogos/:id : atualizar artigo dado um id
     */
    @PutMapping("/jogos/{id}")
    public ResponseEntity<Jogo> updateJogo(@PathVariable("id") long id, @RequestBody Jogo j) {
        Optional<Jogo> data = rep.findById(id);

        if (data.isPresent()) {
            Jogo _j = data.get();
            _j.setTitulo(j.getTitulo());
            _j.setValor(j.getValor());
            _j.setGenero(j.getGenero());

            return new ResponseEntity<>(rep.save(_j), HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    /*
     * DEL /api/jogos/:id : remover artigo dado um id
     */
    @DeleteMapping("/jogos/{id}")
    public ResponseEntity<HttpStatus> deleteJogo(@PathVariable("id") long id) {
        try {
            rep.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /*
     * DEL /api/jogos : remover todos os jogos
     */
    @DeleteMapping("/jogos")
    public ResponseEntity<HttpStatus> deleteAllJogo() {
        try {
            rep.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
