import useReviews from "@/hooks/useReviews";

function Reviews() {
  const { data, isError, isLoading } = useReviews();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong...</p>;
  }

  return (
    <section>
      <h1>Reviews</h1>
      <ul>
        {data?.map((review) => (
          <li key={review.id}>{review.rating}</li>
        ))}
      </ul>
    </section>
  );
}

export default Reviews;
