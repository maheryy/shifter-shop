import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { getOrder } from "@/api/order.api";
import { getProduct } from "@/api/product.api";
import { createReview } from "@/api/review.api";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Input from "@/components/Input";
import RatingPicker from "@/components/RatingPicker";
import { useData } from "@/hooks/useData";
import { Loader } from "@/types/loader";
import { Order } from "@/types/order";
import { Product } from "@/types/product";

const ratingSchema = z.object({
  title: z.string().max(255).optional(),
  details: z.string().max(255).optional(),
  rating: z
    .string({
      required_error: "Please select a rating",
      invalid_type_error: "An error occurred, please try again",
    })
    .min(1)
    .max(5),
});

export type RatingFieldValues = z.infer<typeof ratingSchema>;

interface NewReviewData {
  order: Order;
  product: Product;
}

export const newReviewLoader: Loader<NewReviewData> = async ({ params }) => {
  const { orderId, productId } = params;

  if (!orderId || !productId) {
    throw new Error("Missing required params");
  }

  const [order, product] = await Promise.all([
    getOrder(Number(orderId)),
    getProduct(Number(productId)),
  ]);

  return { order, product };
};

function NewReview() {
  const { order, product } = useData<NewReviewData>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RatingFieldValues>({
    resolver: zodResolver(ratingSchema),
  });

  const onSubmit: SubmitHandler<RatingFieldValues> = useCallback(
    async ({ rating, ...rest }) => {
      await createReview({ rating: Number(rating), ...rest });

      toast.success("Review submitted successfully");
    },
    [],
  );

  const rating = Number(watch("rating"));

  return (
    <div className="px-12 py-6 shadow">
      <h1 className="mb-6 text-xl font-medium capitalize">
        Share your feedback
      </h1>
      <div className="mb-6 flex gap-2 border-b border-gray-200 py-4">
        <div className="h-12 w-12">
          <img alt={product.name} src={product.image} />
        </div>
        <div className="flex flex-col">
          <Link
            className="font-medium text-gray-800"
            to={`/products/${product.id}`}
          >
            {product.name}
          </Link>
          <span className="text-xs text-gray-500">
            Order #{order.reference}
          </span>
        </div>
      </div>
      <Form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <RatingPicker rating={rating} register={register} />
        {errors.rating && (
          <span className="text-sm text-red-500">{errors.rating.message}</span>
        )}
        <Input
          className="block w-full rounded border border-gray-300 p-3 text-sm text-gray-600 placeholder:text-gray-400 focus:border-primary focus:ring-0"
          errorMessage={errors.title?.message}
          id="title"
          placeholder="Give your review a title (optional)"
          register={register}
        />
        <textarea
          className="block w-full resize-none rounded border border-gray-300 p-3 text-sm text-gray-600 placeholder:text-gray-400 focus:border-primary focus:ring-0"
          id="description"
          placeholder="Tell us about your experience (optional)"
          rows={4}
          {...register("details")}
        ></textarea>
        {errors.details && (
          <span className="text-sm text-red-500">{errors.details.message}</span>
        )}
        <Button className="justify-self-center">Send review</Button>
      </Form>
    </div>
  );
}

export default NewReview;
