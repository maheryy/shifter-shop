import { FormEvent, useState } from "react";
import RatingPicker from "../../components/RatingPicker";
import { Link, useLoaderData } from "react-router-dom";
import { OrderAndProduct } from "../../types/order";

const ReviewForm = () => {
  const { order, product } = useLoaderData() as OrderAndProduct;
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="shadow py-6 px-12">
      <h1 className="font-medium text-xl mb-6 capitalize">
        Share your feedback
      </h1>
      <div className="flex gap-2 py-4 mb-6 border-b border-gray-200">
        <div className="w-12 h-12">
          <img src={product.image} />
        </div>
        <div className="flex flex-col">
          <Link
            to={`/products/${product.id}`}
            className="text-gray-800 font-medium text-md"
          >
            {product.name}
          </Link>
          <span className="text-gray-500 text-xs">
            Order #{order.reference}
          </span>
        </div>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <RatingPicker rating={rating} onChange={setRating} />
        </div>
        <div>
          <input
            id="title"
            value={title}
            placeholder="Give your review a title (optional)"
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border border-gray-300 px-3 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
          />
        </div>
        <div>
          <textarea
            id="description"
            value={details}
            placeholder="Tell us about your experience (optional)"
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
            className="block w-full border border-gray-300 px-3 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400 resize-none"
          ></textarea>
        </div>
        <div className="flex mt-3">
          <button
            type="submit"
            className="py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium uppercase text-sm"
          >
            Send review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
