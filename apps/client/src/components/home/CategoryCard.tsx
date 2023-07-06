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
      className="relative h-36 rounded-sm bg-cover bg-center bg-no-repeat md:h-72"

      // TODO
      // style={{
      //   backgroundImage: `url("${category.image}")`,
      // }}
    >
      <Link
        className="absolute inset-0 flex items-center justify-center bg-black/40 font-roboto text-xl font-medium text-white transition hover:bg-black/60"
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
