import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { useAuthContext } from "@/hooks/context";
import useUser from "@/hooks/useUser";

const schema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
});

type ProfileFieldValues = z.infer<typeof schema>;

const Profile = () => {
  const { user } = useAuthContext();
  const { mutate } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFieldValues>({
    defaultValues: user || {},
    resolver: zodResolver(schema),
  });

  const onSubmit = mutate as SubmitHandler<ProfileFieldValues>;

  return (
    <section className="grid gap-8">
      <Link className="md:hidden" to="/account">
        &lt; Back
      </Link>
      <div className="grid gap-8 rounded md:justify-items-center md:p-4 md:shadow">
        <h1 className="text-xl font-medium capitalize">Profile information</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-8 lg:grid-cols-2">
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
          </div>
          <Input
            disabled
            errorMessage={errors.email?.message}
            id="email"
            label="Email Address"
            register={register}
            type="email"
          />
          <Button className="justify-self-center">Save changes</Button>
        </Form>
      </div>
    </section>
  );
};

export default Profile;
