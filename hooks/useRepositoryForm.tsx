import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import repositoryApi from "../api/repositoryApi";
import { IRepository } from "../types/repository";

type RepositoryForm = Pick<IRepository, "url">;

type UseRepositoryFormProps = {
  course: string;
};

const useRepositoryForm = ({ course }: UseRepositoryFormProps) => {
  const toast = useToast();
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      url: "",
    } as RepositoryForm,
  });

  const onSubmit = async ({ url }: RepositoryForm) => {
    try {
        const {data} = await repositoryApi.post("/repositories", {
        url,
        course,
      });
      toast({
        title: "Repositorio creado",
        description: `Realizaste un aporte a ${data.data.course.name}`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      })
      setSuccess(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      })
      setSuccess(false);
    }
  };

  return {
    register,
    handleSubmitForm: handleSubmit(onSubmit),
    reset,
    formState,
    success,
  };
};

export default useRepositoryForm;
