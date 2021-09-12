import { request } from "api";

export default {
  getQuests: () => request(`http://localhost:1337/quests`, "get"),
  getQuestById: (id: string | number) =>
    request(`http://localhost:1337/quests/${id}`),
  updateQuest: (id: string | number, params: any) =>
    request(`http://localhost:1337/quests/${id}`, "put", params),
};
