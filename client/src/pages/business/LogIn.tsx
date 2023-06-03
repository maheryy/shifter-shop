import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { getAuthToken, getUser } from "@/api/user.api";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { useAuthContext } from "@/hooks/context";
import { ToLogInNavigationState } from "./Register/Landing";

const schema = z.object({
  email: z.string().email(),
  password: z.string().nonempty({ message: "Required" }),
});

type Inputs = z.infer<typeof schema>;

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticate } = useAuthContext();
  const { email, redirectTo } =
    (location.state as ToLogInNavigationState) || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { email },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async ({ email, password }) => {
      try {
        const token = await getAuthToken(email, password);
        const user = await getUser(token);

        authenticate(user, token);

        if (!redirectTo) {
          return navigate("/business");
        }

        return navigate(redirectTo);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    },
    [authenticate, navigate, redirectTo],
  );

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
        <div className="flex justify-between">
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
        <Button>Log in</Button>
      </Form>
    </section>
  );
};

export default LogIn;
