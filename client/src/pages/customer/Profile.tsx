import { useCallback } from "react";
import { useAuthContext } from "@/hooks/context";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Form from "@/components/Form";
import { updateUser } from "@/api/user.api";

const schema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

type Inputs = z.infer<typeof schema>;

const Profile = () => {
  const { user } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: user || {},
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = useCallback(async (data) => {
    try {
      await updateUser(data);

      toast.success("Profile updated successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }, []);

  return (
    <div className="shadow rounded px-6 pt-5 pb-7">
      <h1 className="text-xl capitalize font-medium mb-6">
        Profile information
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 w-full justify-items-center">
          <Input
            errorMessage={errors.firstname?.message}
            id="firstname"
            label="First name"
            register={register}
            type="text"
          />
          <Input
            errorMessage={errors.lastname?.message}
            id="lastname"
            label="Last name"
            register={register}
            type="text"
          />
          <Input
            errorMessage={errors.email?.message}
            id="email"
            label="Email Address"
            register={register}
            type="email"
            disabled
          />
          <Input
            errorMessage={errors.phone?.message}
            id="phone"
            label="Phone number"
            register={register}
            type="tel"
          />
        </div>
        <Button>Save changes</Button>
      </Form>
    </div>
  );
};

export default Profile;
