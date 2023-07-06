import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import useCategories from "@/hooks/useCategories";
import { useCreateProduct } from "@/hooks/useProduct";

const productSchema = z.object({
  name: z.string().trim().min(1).max(256),
  price: z.string(),
  description: z.string().max(2048).optional(),
  categoryId: z.string(),
});

type ProductFieldValues = z.infer<typeof productSchema>;

function NewProduct() {
  const { data: categories } = useCategories();
  const { mutate } = useCreateProduct();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProductFieldValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<ProductFieldValues> = (data) => {
    mutate({ ...data, price: parseFloat(data.price) });

    navigate("/business/dashboard/products");
  };

  return (
    <section className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors.name?.message}
          id="name"
          label="Name"
          register={register}
        />
        <select
          className="rounded border-gray-200 bg-gray-200 px-4 py-3 text-sm text-gray-600 shadow-sm focus:border-primary focus:ring-primary"
          {...register("categoryId")}
        >
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="grid gap-2">
          <label htmlFor="intent">Description</label>
          <textarea
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="intent"
            rows={5}
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-red-500">{errors.description?.message}</p>
          )}
        </div>
        <Input
          errorMessage={errors.price?.message}
          id="price"
          label="Price"
          register={register}
          step="0.01"
          type="number"
        />
        <Button className="justify-self-center">Update</Button>
      </Form>
    </section>
  );
}

export default NewProduct;
