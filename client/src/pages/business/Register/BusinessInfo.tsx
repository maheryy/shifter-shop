import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import { z } from "zod";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { useRegisterContext } from "@/hooks/context";

const schema = z.object({
  phoneNumber: z
    .string()
    .refine(isMobilePhone, { message: "Invalid phone number" }),
  business: z.object({
    name: z.string().nonempty({ message: "Required" }),
    category: z.string().nonempty({ message: "Required" }),
    address: z.object({
      address1: z.string().nonempty({ message: "Required" }),
      address2: z.string().optional(),
      zip: z.string().nonempty({ message: "Required" }),
      city: z.string().nonempty({ message: "Required" }),
      state: z.string().nonempty({ message: "Required" }),
    }),
  }),
});

type Inputs = z.infer<typeof schema>;

function BusinessInfo() {
  const navigate = useNavigate();
  const [state, setState] = useRegisterContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: state, resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      try {
        setState({ ...state, ...data });

        navigate("/business/register/finish");
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    },
    [navigate, setState, state],
  );

  return (
    <section className="container grid gap-8 py-16 md:justify-items-center">
      <h1 className="text-2xl font-bold">Enter your business details</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <h2 className="text-lg font-medium">Contact information</h2>
          <Input
            errorMessage={errors.phoneNumber?.message}
            id="phoneNumber"
            label="Business phone"
            register={register}
          />
        </div>
        <div className="grid gap-4">
          <h2 className="text-lg font-medium">Business information</h2>
          <Input
            errorMessage={errors.business?.name?.message}
            id="business.name"
            label="Business name"
            register={register}
          />
          <Input
            errorMessage={errors.business?.category?.message}
            id="business.category"
            label="Business type"
            register={register}
          />
        </div>
        <div className="grid gap-4">
          <h2 className="text-lg font-medium">Business address</h2>
          <Input
            errorMessage={errors.business?.address?.address1?.message}
            id="business.address.address1"
            label="Street address"
            register={register}
          />
          <Input
            errorMessage={errors.business?.address?.address2?.message}
            id="business.address.address2"
            label="Suite, unit, floor (optional)"
            register={register}
          />
          <Input
            errorMessage={errors.business?.address?.zip?.message}
            id="business.address.zip"
            label="ZIP code"
            register={register}
          />
          <Input
            errorMessage={errors.business?.address?.city?.message}
            id="business.address.city"
            label="City"
            register={register}
          />
          <Input
            errorMessage={errors.business?.address?.state?.message}
            id="business.address.state"
            label="State"
            register={register}
          />
        </div>
        <Button>Create business account</Button>
      </Form>
      <small className="text-gray-600">
        By creating a business account, you agree to the{" "}
        <Link
          className="text-primary underline-offset-4 hover:underline"
          to="#"
        >
          Shifter Shop Business Accounts Terms and Conditions
        </Link>
        . You are creating a business account on behalf of the organization
        named above and agree you have authority to bind that organization.
      </small>
    </section>
  );
}

export default BusinessInfo;
