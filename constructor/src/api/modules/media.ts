import { request } from "api";

export default {
  getAllMedia: () => request(`/upload/files`, "get"),
  addMedia: (file: any) =>
    request(`/upload/`, "post", file),
  removeMediaById: (id: string | number) =>
    request(`/upload/files/${id}`, "delete"),
};
