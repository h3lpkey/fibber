import { request } from "api";

export default {
  getQuests: () => request(`/quests`, "get"),
  getQuestById: (id: string | number) => request(`/quests/${id}`),
  updateQuest: (id: string | number, params: any) =>
    request(`/quests/${id}`, "put", params),
};
