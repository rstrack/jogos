package br.com.api.jogos_gui.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "jogo")
@Getter
@Setter
public class Jogo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String titulo;

    @Column
    private double valor;

    @Column
    private String genero;

    public Jogo() {
        this.titulo = "";
        this.valor = 0.0;
        this.genero = "";
    }

    public Jogo(String titulo, double valor, String genero) {
        this.titulo = titulo;
        this.valor = valor;
        this.genero = genero;
    }

    public Jogo(Long id, String titulo, double valor, String genero) {
        this.id = id;
        this.titulo = titulo;
        this.valor = valor;
        this.genero = genero;
    }

}
