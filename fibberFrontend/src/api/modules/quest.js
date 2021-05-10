import { request } from "api";

export default {
  getQuests: () => request(`https://admin.h3lpkey.ru/quests`, "get")
};
g