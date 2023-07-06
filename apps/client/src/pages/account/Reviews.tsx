import { Link } from "react-router-dom";
import ReviewCard from "@/components/account/ReviewCard";
import useReviews from "@/hooks/useReviews";

const Reviews = () => {
  const { data, isError, isLoading } = useReviews();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong...</p>;
  }

  return (
    <section className="grid gap-8 md:grid-cols-2">
      <Link className="md:hidden" to="/account">
        &lt; Back
      </Link>
      {data.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </section>
  );
};

export default Reviews;
