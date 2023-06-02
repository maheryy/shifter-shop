import { Link } from "react-router-dom";
import { Category } from "@/types/category";

const CategoryCard = ({ category }: CategoryCardProps) => {
  const searchParams = new URLSearchParams();

  searchParams.set("categories", category.id.toString());

  const to = {
    pathname: "/products",
    search: searchParams.toString(),
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-sm bg-cover bg-center bg-no-repeat sm:h-36 md:h-72"
      style={{
        backgroundImage: `url("${category.image}")`,
      }}
    >
      <Link
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 font-roboto text-xl font-medium text-white transition hover:bg-opacity-60"
        to={to}
      >
        {category.name}
      </Link>
    </div>
  );
};

interface CategoryCardProps {
  category: Category;
}

export default CategoryCard;
