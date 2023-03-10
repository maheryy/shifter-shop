import { Link } from "react-router-dom";
import { Category } from "../../types/category";

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div
      className="relative rounded-sm overflow-hidden w-full md:h-72 sm:h-36 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url("${category.image}")`,
      }}
    >
      <Link
        to="/products"
        className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium hover:bg-opacity-60 transition"
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
