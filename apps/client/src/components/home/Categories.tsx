import useCategories from "@/hooks/useCategories";
import CategoryCard from "./CategoryCard";

function Categories() {
  const { data, isError, isLoading } = useCategories();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong...</p>;
  }

  return (
    <section className="container py-8">
      <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
        Categories
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {data.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
    </section>
  );
}

export default Categories;
