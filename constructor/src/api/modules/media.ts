import { request } from "api";

export default {
  getAllMedia: () => request(`http://localhost:1337/upload/files`, "get"),
  addMedia: (file: any) =>
    request(`http://localhost:1337/upload/`, "post", file),
  removeMediaById: (id: string | number) =>
    request(`http://localhost:1337/upload/files/${id}`, "delete"),
};
