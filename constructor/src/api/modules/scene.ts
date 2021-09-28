import { request } from "api";

export default {
  getScenes: () => request(`/scenes`, "get"),
  getSceneById: (id: string) =>
    request(`/scenes/${id}`, "get"),
  updateScene: (id: string | number, params: any) =>
    request(`/scenes/${id}`, "put", params),
  createScene: (params: any) =>
    request(`/scenes/`, "post", params),
  deleteScene: (id: string | number) =>
    request(`/scenes/${id}`, "delete"),
};
