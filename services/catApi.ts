import { VoteRequest } from "@/types/requests";
import type { CatBreedsResponse } from "../types/catBreeds";
import { apiRequest } from "./apiClient";

interface GetBreedsParams {
  limit?: number;
  page?: number;
}

export const catApi = {
  /**
   * Fetches a list of cat breeds with pagination support
   * @param params Query parameters for the request
   * @returns Promise with the list of cat breeds
   */
  async getBreeds(params?: GetBreedsParams): Promise<CatBreedsResponse> {
    try {
      const response = await apiRequest.get<CatBreedsResponse>(`/v1/breeds`, {
        params: {
          limit: params?.limit || 10,
          page: params?.page || 0,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cat breeds:", error);
      throw error;
    }
  },
};

export const voteApi = {
  async vote(request: VoteRequest): Promise<void> {
    try {
      await apiRequest.post("/v1/votes", request);
    } catch (error) {
      console.error("Error voting for cat:", error);
      throw error;
    }
  },
};
