# jogos
Desenvolvimento Web - Trabalho 03 

Grupo: Gabriel Julek Klazura, Gustavo Chagas Andrade e Rafael Strack

rotas api:

get - listar todos os jogos:
http://localhost:8080/api/jogos

get - listar jogos por título:
http://localhost:8080/api/jogos&titulo=[titulo]

post - criar jogo:
http://localhost:8080/api/jogos

body:   {
            "titulo": ""
            "valor": ""
            "genero": ""
        }

get - listar jogo dado o id:
http://localhost:8080/api/jogos/:id

put - editar dados de um jogo:
http://localhost:8080/api/jogos/:id

body:   {
            "titulo": ""
            "valor": ""
            "genero": ""
        }

delete - remover jogo dado o id:
http://localhost:8080/api/jogos/:id

delete - remover todos os jogos:
http://localhost:8080/api/jogos/

