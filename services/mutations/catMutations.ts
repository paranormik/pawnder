import { useMutation } from "@tanstack/react-query";
import { voteApi } from "../catApi";

export const useVoteCatImageMutation = () => {
  return useMutation({
    mutationFn: voteApi.vote,
  });
};
