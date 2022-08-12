import http from "../http-common";

class GeneroDataService {
  getAll() {
    return http.get("/api/generos");
  }

  get(id) {
    return http.get(`/api/generos/${id}`);
  }

  create(data) {
    return http.post("/api/generos", data);
  }

  update(id, data) {
    return http.put(`/api/generos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/generos/${id}`);
  }

  deleteAll() {
    return http.delete(`/api/generos`);
  }
}

export default new GeneroDataService();