import { FormEvent, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import RatingPicker from "@/components/RatingPicker";
import { OrderAndProduct } from "@/types/order";

const ReviewForm = () => {
  const { order, product } = useLoaderData() as OrderAndProduct;
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="px-12 py-6 shadow">
      <h1 className="mb-6 text-xl font-medium capitalize">
        Share your feedback
      </h1>
      <div className="mb-6 flex gap-2 border-b border-gray-200 py-4">
        <div className="h-12 w-12">
          <img src={product.image} />
        </div>
        <div className="flex flex-col">
          <Link
            className="text-md font-medium text-gray-800"
            to={`/products/${product.id}`}
          >
            {product.name}
          </Link>
          <span className="text-xs text-gray-500">
            Order #{order.reference}
          </span>
        </div>
      </div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col gap-1">
          <RatingPicker onChange={setRating} rating={rating} />
        </div>
        <div>
          <input
            className="block w-full rounded border border-gray-300 p-3 text-sm text-gray-600 placeholder:text-gray-400 focus:border-primary focus:ring-0"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your review a title (optional)"
            value={title}
          />
        </div>
        <div>
          <textarea
            className="block w-full resize-none rounded border border-gray-300 p-3 text-sm text-gray-600 placeholder:text-gray-400 focus:border-primary focus:ring-0"
            id="description"
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Tell us about your experience (optional)"
            rows={4}
            value={details}
          ></textarea>
        </div>
        <div className="mt-3 flex">
          <button
            className="rounded-md border border-primary bg-primary px-4 py-3 text-center text-sm font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
            type="submit"
          >
            Send review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
