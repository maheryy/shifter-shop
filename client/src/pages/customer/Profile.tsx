import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { updateUser } from "@/api/user.api";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { useAuthContext } from "@/hooks/context";

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
    <section className="grid gap-8">
      <Link className="md:hidden" to="/account">
        &lt; Back
      </Link>
      <div className="grid gap-8 rounded md:justify-items-center md:p-4 md:shadow">
        <h1 className="text-xl font-medium capitalize">Profile information</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            disabled
            errorMessage={errors.email?.message}
            id="email"
            label="Email Address"
            register={register}
            type="email"
          />
          <Input
            errorMessage={errors.phone?.message}
            id="phone"
            label="Phone number"
            register={register}
            type="tel"
          />
          <Button>Save changes</Button>
        </Form>
      </div>
    </section>
  );
};

export default Profile;
