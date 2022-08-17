import http from "../http-common";

//caminho base definido em http-common.js -> http://localhost:8080/api

class JogoDataService {
  getAll() {
    return http.get("/jogos");
  }

  get(id) {
    return http.get(`/jogos/${id}`);
  }

  create(data) {
    return http.post("/jogos", data);
  }

  update(id, data) {
    return http.put(`/jogos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/jogos/${id}`);
  }

  deleteAll() {
    return http.delete(`/jogos`);
  }

  findByTitulo(data) {
    return http.get(`/jogos?titulo=${data}`);
  }
}

export default new JogoDataService();