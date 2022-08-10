package br.com.api.jogos_gui.modelo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
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
    private int id;

    @Column
    private String titulo;

    @Column
    private double valor;

    @OneToOne
    private Genero genero;

    public Jogo() {
        this.id = 0;
        this.titulo = "";
        this.valor = 0.0;
        this.genero = new Genero();
    }

    public Jogo(int id, String titulo, double valor, Genero genero) {
        this.id = id;
        this.titulo = titulo;
        this.valor = valor;
        this.genero = genero;
    }

}
