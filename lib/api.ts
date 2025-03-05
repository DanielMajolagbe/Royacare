import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
  headers: {
    "Content-Type": "application/json",
  },
});

export const completeStage = async (stageNumber: number, userId: string) => {
  try {
    const response = await api.post("/api/staff/complete-stage", {
      stageNumber,
      userId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api; 