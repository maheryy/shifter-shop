import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/context";
import { getAuthToken, getUser } from "@/api/user.api";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/Form";
import { useCallback } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ToLogInNavigationState } from "./Register/Landing";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type Inputs = z.infer<typeof schema>;

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticate } = useAuthContext();
  const { email, redirectTo } = location.state as ToLogInNavigationState;

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
    []
  );

  return (
    <section className="p-4">
      <h1 className="text-2xl font-medium mb-8">Log in to get started</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          label="Email"
          id="email"
          register={register}
          errorMessage={errors.email?.message}
        />
        <Input
          type="password"
          label="password"
          id="password"
          register={register}
          errorMessage={errors.password?.message}
        />
        <div className="grid grid-flow-col gap-4">
          <div className="grid grid-flow-col gap-2">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="text-primary focus:ring-0 rounded-sm cursor-pointer"
            />
            <label htmlFor="remember" className="text-gray-600 cursor-pointer">
              Remember me
            </label>
          </div>
          <Link to="#" className="text-primary">
            I Forgot my password
          </Link>
        </div>
        <Button>Log in</Button>
      </Form>
    </section>
  );
};

export default LogIn;
