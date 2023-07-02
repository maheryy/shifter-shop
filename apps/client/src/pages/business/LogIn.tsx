import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { z } from "zod";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import useLogin from "@/hooks/useLogin";
import { ToLogInNavigationState } from "./Register/Landing";

const schema = z.object({
  email: z.string().email(),
  password: z.string().nonempty({ message: "Required" }),
});

type LoginFieldValues = z.infer<typeof schema>;

const LogIn = () => {
  const location = useLocation();

  const { email, redirectTo } =
    (location.state as ToLogInNavigationState) || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFieldValues>({
    defaultValues: { email },
    resolver: zodResolver(schema),
  });

  const { mutate } = useLogin(redirectTo ?? "/business");

  const onSubmit = mutate as SubmitHandler<LoginFieldValues>;

  return (
    <section className="container grid gap-8 py-16 md:justify-items-center">
      <h1 className="text-2xl font-bold">Log in to get started</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors.email?.message}
          id="email"
          label="Email"
          register={register}
          type="email"
        />
        <Input
          errorMessage={errors.password?.message}
          id="password"
          label="Password"
          register={register}
          type="password"
        />
        <div className="flex justify-between md:justify-center md:gap-8 ">
          <div className="flex gap-2">
            <input
              className="cursor-pointer rounded-sm text-primary focus:ring-0"
              id="remember"
              name="remember"
              type="checkbox"
            />
            <label className="cursor-pointer text-gray-600" htmlFor="remember">
              Remember me
            </label>
          </div>
          <Link className="text-primary" to="#">
            I Forgot my password
          </Link>
        </div>
        <Button className="justify-self-center">Log in</Button>
      </Form>
    </section>
  );
};

export default LogIn;
