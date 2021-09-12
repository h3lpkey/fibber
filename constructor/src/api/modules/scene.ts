import { request } from "api";

export default {
  getScenes: () => request(`http://localhost:1337/scenes`, "get"),
  getSceneById: (id: string) =>
    request(`http://localhost:1337/scenes/${id}`, "get"),
  updateScene: (id: string | number, params: any) =>
    request(`http://localhost:1337/scenes/${id}`, "put", params),
  createScene: (params: any) =>
    request(`http://localhost:1337/scenes/`, "post", params),
  deleteScene: (id: string | number) =>
    request(`http://localhost:1337/scenes/${id}`, "delete"),
};
