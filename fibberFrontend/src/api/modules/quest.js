import { request } from "api";

export default {
  getQuests: () => request(`http://localhost:1337/quests`, "get")
};
