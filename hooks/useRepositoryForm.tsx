import { useState } from "react";
import { useForm } from "react-hook-form";
import { IRepository } from "../types/repository";
import useCreateRepositoryMutation from "./useCreateRepositoryMutation";

type RepositoryForm = Pick<IRepository, "url">;

type UseRepositoryFormProps = {
  course: string;
};

const useRepositoryForm = ({ course }: UseRepositoryFormProps) => {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      url: "",
    } as RepositoryForm,
  });
  const { createMutation } = useCreateRepositoryMutation();

  const onSubmit = async ({ url }: RepositoryForm) => {
    setSuccess(false);
    createMutation
      .mutateAsync({ url, course })
      .then(() => setSuccess(true))
      .catch(() => setSuccess(false));
  };

  return {
    register,
    handleSubmit,
    handleSubmitForm: handleSubmit(onSubmit),
    reset,
    formState,
    success,
  };
};

export default useRepositoryForm;
