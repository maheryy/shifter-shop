import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { hasAccount } from "@/api/user.api";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { useAuthContext, useRegisterContext } from "@/hooks/context";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

type BusinessLandingFieldValues = z.infer<typeof schema>;

function Landing() {
  const navigate = useNavigate();
  const [state, setState] = useRegisterContext();
  const [mustConvert, setMustConvert] = useState(false);
  const { isAuthenticated } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    getValues,
  } = useForm<BusinessLandingFieldValues>({ resolver: zodResolver(schema) });

  if (isAuthenticated) {
    return <Navigate replace to="/business/register/business-request" />;
  }

  const onSubmit: SubmitHandler<BusinessLandingFieldValues> = async ({
    email,
  }) => {
    try {
      const mustConvert = await hasAccount(email);

      if (!mustConvert) {
        setState({ ...state, email });

        return navigate("/business/register");
      }

      return setMustConvert(mustConvert);
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      return toast.error("Something went wrong");
    }
  };

  const onUseDifferentEmailClick = () => {
    resetField("email");
    setMustConvert(false);
  };

  return (
    <section className="container grid gap-8 py-16 md:justify-items-center">
      <h1 className="text-2xl font-bold">
        Let’s create your free Shifter Shop Business account
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors.email?.message}
          id="email"
          label="What email would you like to use ?"
          placeholder="Enter email"
          register={register}
          type="email"
        />
        {mustConvert ? (
          <div className="grid justify-items-center gap-4 bg-primary-light p-8">
            <h2 className="text-lg font-medium">
              This email is already in use
            </h2>
            <p>
              If you continue, the existing account will become a Shifter Shop
              Business account.
            </p>
            <Link
              className="w-full rounded-md border border-primary bg-primary px-4 py-3 text-center text-sm font-medium uppercase text-white transition hover:bg-transparent hover:text-primary md:max-w-md"
              state={{
                email: getValues("email"),
                redirectTo: "/business/register/business-info",
              }}
              to="/business/login"
            >
              Continue with this email
            </Link>
            <button
              className="cursor-pointer underline underline-offset-4"
              onClick={onUseDifferentEmailClick}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <Button className="justify-self-center">Get started</Button>
        )}
      </Form>
      <small className="text-gray-600">
        Make sure you have information about your organization to help us verify
        your business account faster.
      </small>
    </section>
  );
}

export default Landing;
