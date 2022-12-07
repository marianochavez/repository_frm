import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import repositoryApi from "../api/repositoryApi";
import { IRepository } from "../types/repository";

const useCreateRepositoryMutation = () => {
  const toast = useToast();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async ({ url, course }: { url: string; course: string }) => {
      const { data } = await repositoryApi.post("/repositories", {
        url,
        course,
      });

      return data;
    },
    onSuccess: (data: { data: IRepository }) =>
      queryClient.setQueriesData(
        ["repositories", { user: session!.user._id }],
        (oldData: IRepository[] | undefined) => {
          oldData?.unshift(data.data);

          return oldData;
        }
      ),
    onMutate: () =>
      toast({
        title: "Repositorio creado",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      }),
    onError: () => {
      toast({
        title: "Error",
        description: "",
        status: "error",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  return {
    createMutation,
  };
};

export default useCreateRepositoryMutation;
