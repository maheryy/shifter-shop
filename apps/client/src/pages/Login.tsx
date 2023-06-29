import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { z } from "zod";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import useLogin from "@/hooks/useLogin";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty({ message: "Required" }),
});

type LoginFieldValues = z.infer<typeof loginSchema>;

const Login = () => {
  const location = useLocation();
  const { redirectTo } = location.state || {};
  const { mutate } = useLogin(redirectTo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFieldValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = mutate as SubmitHandler<LoginFieldValues>;

  return (
    <section className="container grid gap-8 py-16">
      <h1 className="mb-8 text-2xl font-medium uppercase">Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors.email?.message}
          id="email"
          label="Email address"
          placeholder="leone@abbacch.io"
          register={register}
          type="email"
        />
        <Input
          errorMessage={errors.password?.message}
          id="password"
          label="Password"
          placeholder="*******"
          register={register}
          type="password"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              className="cursor-pointer rounded-sm text-primary focus:ring-0"
              id="remember"
              name="remember"
              type="checkbox"
            />
            <label
              className="ml-3 cursor-pointer text-gray-600"
              htmlFor="remember"
            >
              Remember me
            </label>
          </div>
          <Link className="text-primary" to="#">
            Forgot password
          </Link>
        </div>
        <Button className="justify-self-center">Login</Button>
      </Form>
      <p className="mt-4 text-center text-gray-600">
        Don’t have account?&nbsp;
        <Link className="text-primary" to="/register">
          Register now
        </Link>
      </p>
    </section>
  );
};

export default Login;
