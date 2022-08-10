package br.com.api.jogos_gui.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.api.jogos_gui.modelo.Genero;

@Transactional
@Qualifier("generos")
@Repository

public interface GeneroRepository extends JpaRepository<Genero, Long>{

    List<Genero> findById(int id);

    List<Genero> findByTituloContaining(String nome);
}
