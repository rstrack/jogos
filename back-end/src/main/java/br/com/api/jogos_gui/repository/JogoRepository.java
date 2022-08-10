package br.com.api.jogos_gui.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.api.jogos_gui.modelo.Jogo;

@Transactional
@Qualifier("jogos")
@Repository

public interface JogoRepository extends JpaRepository<Jogo, Long>{
    
    List<Jogo> findById(int id);

    List<Jogo> findByTituloContaining(String nome);

}
