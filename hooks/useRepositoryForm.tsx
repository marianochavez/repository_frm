import { useForm } from "react-hook-form";
import repositoryApi from "../api/repositoryApi";
import { IRepository } from "../types/repository";

type RepositoryForm = Pick<IRepository, "url">;

type UseRepositoryFormProps = {
  course: string;
  user: string;
};

const useRepositoryForm = ({ course, user }: UseRepositoryFormProps) => {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      url: "",
    } as RepositoryForm,
  });

  const onSubmit = async ({ url }: RepositoryForm) => {
    console.log({ url, course, user });
    try {
      const res = await repositoryApi.post("/repositories", {
        url,
        course,
        user,
      });
      console.log(res);
      // TODO: mostrar toast
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    register,
    handleSubmitForm: handleSubmit(onSubmit),
    formState,
  };
};

export default useRepositoryForm;
