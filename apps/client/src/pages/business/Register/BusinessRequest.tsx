import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import { z } from "zod";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import useBusinessRequest from "@/types/useBusinessRequest";

const schema = z.object({
  company: z.string().trim().min(1, { message: "Required" }),
  phone: z.string().refine((value) => isMobilePhone(value, "fr-FR"), {
    message: "Invalid phone number",
  }),
  intent: z
    .string()
    .trim()
    .min(1, { message: "Required" })
    .max(2048, { message: "Too long" }),
});

type BusinessInfoFieldValues = z.infer<typeof schema>;

function BusinessRequest() {
  const { mutate } = useBusinessRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessInfoFieldValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<BusinessInfoFieldValues> = (data) => {
    mutate(data);
  };

  return (
    <section className="container grid gap-8 py-16 md:justify-items-center">
      <h1 className="text-2xl font-bold">
        Tell us more about you & your business
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors.phone?.message}
          id="phone"
          label="Please enter your phone number"
          register={register}
          type="tel"
        />
        <Input
          errorMessage={errors.company?.message}
          id="company"
          label="Your business name"
          register={register}
        />
        <div className="grid gap-2">
          <label htmlFor="intent">
            A few words about your business and why you want to sell on our
            platform
          </label>
          <textarea
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="intent"
            rows={5}
            {...register("intent")}
          />
          {errors.intent?.message && (
            <p className="text-red-500">{errors.intent?.message}</p>
          )}
        </div>
        <Button className="justify-self-center">Jump in</Button>
      </Form>
    </section>
  );
}

export default BusinessRequest;
