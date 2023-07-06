import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { getProduct } from "@/api/product.api";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import useCategories from "@/hooks/useCategories";
import { useData } from "@/hooks/useData";
import { useUpdateProduct } from "@/hooks/useProduct";
import { Loader } from "@/types/loader";
import { TProduct } from "@/types/product";

const productSchema = z.object({
  name: z.string(),
  price: z.string(),
  description: z.string().optional(),
  categoryId: z.string().optional(),
});

type ProductFieldValues = z.infer<typeof productSchema>;

interface EditProductData {
  product: TProduct;
}

export const editProductLoader: Loader<EditProductData> = async ({
  params,
}) => {
  const { productId } = params;

  if (!productId) {
    throw new Error("Missing required params");
  }

  const product = await getProduct(productId);

  return {
    product,
  };
};

function EditProduct() {
  const { product } = useData<EditProductData>();
  const { data: categories } = useCategories();
  const { mutate } = useUpdateProduct();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProductFieldValues>({
    defaultValues: { ...product, price: product.price.toString() },
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<ProductFieldValues> = (data) => {
    mutate({
      id: product.id,
      data: { ...data, price: parseFloat(data.price) },
    });

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
          defaultValue={product.categoryId}
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

export default EditProduct;
