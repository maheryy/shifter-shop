import { Product } from "../types/product";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/product.api";
import { getAllCategories } from "../api/category.api";
import { Category } from "../types/category";
import ProductCard from "../components/ProductCard";
import { ProductListFilters, SortType, SortTypeMapping } from "../types/filter";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [sortBy, setSortBy] = useState(SortType.LATEST);
  const [selectedCategories, setSelectedCategories] = useState<
    Category["id"][]
  >([]);

  useEffect(() => {
    getAllProducts()
      .then((products) => setProducts(products))
      .catch((err) => console.log(err));

    getAllCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => console.log(err));
  }, []);

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    if (checked) {
      setSelectedCategories((categories) => [...categories, Number(value)]);
    } else {
      setSelectedCategories((categories) =>
        categories.filter((category) => category !== Number(value))
      );
    }
  };

  useEffect(() => {
    console.log(selectedCategories, sortBy, minPrice, maxPrice);
  }, [selectedCategories, sortBy, minPrice, maxPrice]);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-4 gap-6 items-start">
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden relative">
          <div className="divide-y divide-gray-200 space-y-5">
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div className="flex items-center" key={`cat-${category.id}`}>
                    <input
                      type="checkbox"
                      name="categories[]"
                      id={`cat-${category.id}`}
                      value={category.id}
                      onChange={handleCategoryFilter}
                      className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                    />
                    <label
                      htmlFor={`cat-${category.id}`}
                      className="text-gray-600 ml-3 cusror-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Price
              </h3>
              <div className="mt-4 flex items-center">
                <input
                  type="number"
                  name="min"
                  min="1"
                  className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                  placeholder="min"
                  onChange={(e) =>
                    setMinPrice(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  value={minPrice || ""}
                />
                <span className="mx-3 text-gray-500">-</span>
                <input
                  type="number"
                  name="max"
                  min="1"
                  className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                  placeholder="max"
                  onChange={(e) =>
                    setMaxPrice(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  value={maxPrice || ""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="flex items-center mb-4 justify-start">
            <select
              onChange={(e) => setSortBy(e.target.value as SortType)}
              name="sort"
              value={sortBy}
              className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
            >
              {Object.keys(SortTypeMapping).map((key) => {
                return (
                  <option key={key} value={key}>
                    {SortTypeMapping[key as keyof typeof SortTypeMapping]}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
