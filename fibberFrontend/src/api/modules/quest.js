import { request } from "api";

const url = process.env.REACT_APP_BACKEND_URL;

export default {
  getQuests: () => request(`${url}/quests`, "get")
};
