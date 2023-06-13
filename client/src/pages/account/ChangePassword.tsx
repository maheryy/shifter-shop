import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { updatePassword } from "@/api/user.api";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";

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
    },
  );

type ChangePasswordFieldValues = z.infer<typeof schema>;

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFieldValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFieldValues> = useCallback(
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
    [],
  );

  return (
    <section className="grid gap-8">
      <Link className="md:hidden" to="/account">
        &lt; Back
      </Link>
      <div className="grid gap-8 rounded md:justify-items-center md:p-4 md:shadow">
        <h1 className="text-xl font-medium capitalize">Change password</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Button className="justify-self-center">Update</Button>
        </Form>
      </div>
    </section>
  );
}

export default ChangePassword;
