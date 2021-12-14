import { request } from "api";

export default {
  login: (params: any) => request(`/auth/local`, "post", params),
};
