import http from "../http-common";

class GeneroDataService {
  getAll() {
    return http.get("/generos");
  }

  get(id) {
    return http.get(`/generos/${id}`);
  }

  create(data) {
    return http.post("/generos", data);
  }

  update(id, data) {
    return http.put(`/generos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/generos/${id}`);
  }

  deleteAll() {
    return http.delete(`/generos`);
  }
}

export default new GeneroDataService();