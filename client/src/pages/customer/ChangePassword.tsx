import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { updatePassword } from "@/api/user.api";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Form from "@/components/Form";

const schema = z
  .object({
    confirmPassword: z.string(),
    currentPassword: z.string().nonempty({
      message: "Current password is required",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type Inputs = z.infer<typeof schema>;

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async ({ newPassword }) => {
      try {
        await updatePassword(newPassword);

        toast.success("Password updated successfully");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    },
    []
  );

  return (
    <section className="shadow rounded px-6 pt-5 pb-7">
      <h1 className="text-xl capitalize font-medium mb-6">Change password</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 w-full justify-items-center">
          <Input
            errorMessage={errors.currentPassword?.message}
            id="currentPassword"
            label="Current Password"
            register={register}
            type="password"
          />
          <Input
            errorMessage={errors.newPassword?.message}
            id="newPassword"
            label="New Password"
            register={register}
            type="password"
          />
          <Input
            errorMessage={errors.confirmPassword?.message}
            id="confirmPassword"
            label="Confirm Password"
            register={register}
            type="password"
          />
        </div>
        <Button>Update</Button>
      </Form>
    </section>
  );
}

export default ChangePassword;
