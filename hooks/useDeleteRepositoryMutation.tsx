import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

import repositoryApi from "../axiosConfig/repositoryApi";
import { IRepository } from "../types/repository";
import { AuthContext } from "../context/auth/AuthContext";

const useDeleteRepositoryMutation = () => {
  const { session } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const toast = useToast();
  const deleteMutation = useMutation({
    mutationFn: async (repo: IRepository) => {
      const { data } = await repositoryApi.delete(`/repositories/${repo._id}`);

      return data;
    },
    onSuccess: (data: { data: IRepository }) =>
      queryClient.setQueryData(
        ["repositories", { user: session!.user._id }],
        (oldData: IRepository[] | undefined) => {
          return oldData!.filter(
            (repo: IRepository) => repo._id !== data.data._id
          );
        }
      ),
    onMutate: () => {
      toast({
        title: "Repositorio eliminado",
        status: "info",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    },
    onError: () =>
      toast({
        title: "Error",
        description: "No se pudo eliminar el repositorio",
        status: "error",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      }),
  });
  return { deleteMutation };
};

export default useDeleteRepositoryMutation;
