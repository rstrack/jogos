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
@Table(name = "genero")
@Getter
@Setter
public class Genero {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    private String descricao;

    @Column
    private int classificacaoIndicativa;

    public Genero() {
        this.id = 0;
        this.descricao = "";
        this.classificacaoIndicativa = 0;
    }

    public Genero(int id, String descricao, int classificacaoIndicativa) {
        this.id = id;
        this.descricao = descricao;
        this.classificacaoIndicativa = classificacaoIndicativa;
    }
}
