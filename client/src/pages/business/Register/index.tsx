import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterContext } from "@/hooks/context";

const schema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(8).max(128),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Inputs = z.infer<typeof schema>;

function Register() {
  const navigate = useNavigate();
  const [state, setState] = useRegisterContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: state, resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = useCallback(async (data) => {
    try {
      setState({ ...state, ...data });

      navigate("/business/register/business-info");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, []);

  return (
    <section className="p-4">
      <div className="grid p-4 gap-4">
        <h1 className="text-xl font-bold">
          Enter your full name and choose your business password
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            errorMessage={errors.firstName?.message}
            id="firstName"
            label="First name"
            register={register}
          />
          <Input
            errorMessage={errors.lastName?.message}
            id="lastName"
            label="Last name"
            register={register}
          />
          <Input
            errorMessage={errors.email?.message}
            id="email"
            label="Email"
            type="email"
            register={register}
          />
          <Input
            errorMessage={errors.password?.message}
            id="password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            register={register}
          />
          <Input
            errorMessage={errors.confirmPassword?.message}
            id="confirmPassword"
            label="Re-enter password"
            type="password"
            register={register}
          />
          <Button>Next step</Button>
        </Form>
        <small className="text-gray-600">
          By creating an account, you agree to Shifter Shop's
          <Link
            to="#"
            className="text-primary hover:underline underline-offset-4"
          >
            Conditions of Use
          </Link>
          and{" "}
          <Link
            to="#"
            className="text-primary hover:underline underline-offset-4"
          >
            Privacy Notice
          </Link>
          .
        </small>
      </div>
    </section>
  );
}

export default Register;
