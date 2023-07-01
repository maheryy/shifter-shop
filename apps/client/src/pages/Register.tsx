import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import { z } from "zod";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import useRegister from "@/hooks/useRegister";

const registerSchema = z
  .object({
    email: z.string().email(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string().refine(isStrongPassword, {
      message:
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number and one symbol",
    }),
    passwordConfirmation: z.string(),
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    },
  );

type RegisterFieldValues = z.infer<typeof registerSchema>;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFieldValues>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate } = useRegister();

  const onSubmit = mutate as SubmitHandler<RegisterFieldValues>;

  return (
    <section className="container grid gap-8 py-16">
      <h1 className="mb-8 text-2xl font-medium uppercase">Create an account</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8 lg:grid-cols-2">
          <Input
            errorMessage={errors.firstname?.message}
            id="firstname"
            label="First name"
            placeholder="Leone"
            register={register}
          />
          <Input
            errorMessage={errors.lastname?.message}
            id="lastname"
            label="Last name"
            placeholder="Abbacchio"
            register={register}
          />
        </div>
        <Input
          errorMessage={errors.email?.message}
          id="email"
          label="Email"
          placeholder="leone@abbacch.io"
          register={register}
          type="email"
        />
        <Input
          errorMessage={errors.password?.message}
          id="password"
          label="Password"
          placeholder="*********"
          register={register}
          type="password"
        />
        <Input
          errorMessage={errors.password?.message}
          id="passwordConfirmation"
          label="Confirm Password"
          placeholder="*********"
          register={register}
          type="password"
        />
        <Button className="justify-self-center">create account</Button>
      </Form>
      <p className="mt-4 text-center text-gray-600">
        Already have account?&nbsp;
        <Link className="text-primary" to="/login">
          Login now
        </Link>
      </p>
    </section>
  );
}

export default Register;
