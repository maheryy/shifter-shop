import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { hasAccount } from "@/api/user.api";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { useRegisterContext } from "@/hooks/context";

export interface ToLogInNavigationState {
  email?: string;
  redirectTo?: string;
}

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

type Inputs = z.infer<typeof schema>;

function Landing() {
  const navigate = useNavigate();
  const [state, setState] = useRegisterContext();
  const [mustConvert, setMustConvert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    getValues,
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = useCallback(async ({ email }) => {
    try {
      const mustConvert = await hasAccount(email);

      if (!mustConvert) {
        setState({ ...state, email });

        return navigate("/business/register");
      }

      return setMustConvert(mustConvert);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, []);

  const onContinueWithThisEmailClick = useCallback(() => {
    if (!mustConvert) {
      return;
    }

    const state: ToLogInNavigationState = {
      email: getValues("email"),
      redirectTo: "/business/register/business-info",
    };

    navigate("/business/login", {
      state,
    });
  }, [mustConvert]);

  const onUseDifferentEmailClick = useCallback(() => {
    resetField("email");
    setMustConvert(false);
  }, []);

  return (
    <section className="p-4">
      <div className="grid gap-4 p-4">
        <h1 className="text-xl font-bold">
          Let's create your free Shifter Shop Business account
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            errorMessage={errors.email?.message}
            id="email"
            label="Enter the email you'd like to use for your business account"
            placeholder="Enter email"
            register={register}
            type="email"
          />
          {mustConvert ? (
            <div className="grid justify-items-center gap-4 bg-primary-light p-4">
              <h2 className="text-lg font-medium">
                This email is already in use for a Shifter Shop account
              </h2>
              <p>
                If you continue, the existing account will become a Shifter Shop
                Business account.
              </p>
              <Button onClick={onContinueWithThisEmailClick}>
                Continue with this email
              </Button>
              <div
                className="cursor-pointer underline underline-offset-4"
                onClick={onUseDifferentEmailClick}
              >
                Use a different email
              </div>
            </div>
          ) : (
            <Button>Get started</Button>
          )}
        </Form>
        <small className="text-gray-600">
          Make sure you have information about your organization to help us
          verify your business account faster.
        </small>
      </div>
    </section>
  );
}

export default Landing;
