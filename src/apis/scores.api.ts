import { instance as axiosClient } from "@/configs";

export const scoresApi = {
  getScores: async (sdb: string) => {
    return await axiosClient.get(`/scores/sbd/${sdb}`);
  },
  getStatistics: async () => {
    return await axiosClient.get("/scores/statistics");
  },
  getTopGroupA: async () => {
    return await axiosClient.get("/scores/top-group-a");
  },
};
