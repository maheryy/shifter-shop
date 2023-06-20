import { useCallback, useEffect, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories } from "@/api/category.api";
import { getProducts } from "@/api/product.api";
import ProductCard from "@/components/ProductCard";
import { useData } from "@/hooks/useData";
import { Category } from "@/types/category";
import { Loader } from "@/types/loader";
import { ProductsSearchParams, SortBy, SortTypeMapping } from "@/types/params";
import { Product } from "@/types/product";

type Action =
  | { type: "SORT_BY"; payload: SortBy }
  | { type: "MIN_PRICE"; payload: number }
  | { type: "MAX_PRICE"; payload: number }
  | { type: "CATEGORIES"; payload: Category["id"][] };

function reducer(state: ProductsSearchParams, { payload, type }: Action) {
  switch (type) {
    case "CATEGORIES": {
      return {
        ...state,
        categories: payload,
      };
    }

    case "MAX_PRICE": {
      return {
        ...state,
        maxPrice: payload,
      };
    }

    case "MIN_PRICE": {
      return {
        ...state,
        minPrice: payload,
      };
    }

    case "SORT_BY": {
      return {
        ...state,
        sortBy: payload,
      };
    }

    default: {
      return state;
    }
  }
}

export interface ProductsData {
  categories: Category[];
  searchParams: ProductsSearchParams;
  initialProducts: Product[];
}

export const productsLoader: Loader<ProductsData> = async ({ request }) => {
  try {
    const searchParams = getProductsSearchParams(request.url);

    const [categories, initialProducts] = await Promise.all([
      getCategories(),
      getProducts(searchParams),
    ]);

    return {
      categories,
      searchParams,
      initialProducts,
    };
  } catch (error) {
    console.error(error);

    throw error;
  }
};

function Products() {
  const [, setSearchParams] = useSearchParams();
  const { categories, searchParams, initialProducts } = useData<ProductsData>();
  const [state, dispatch] = useReducer(reducer, searchParams);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const setState = useCallback(
    (action: Action) => {
      dispatch(action);

      const { payload, type } = action;

      setSearchParams((searchParams) => {
        switch (type) {
          case "CATEGORIES": {
            if (payload.length === 0) {
              searchParams.delete("categories");

              return searchParams;
            }

            searchParams.set("categories", payload.join(","));

            return searchParams;
          }

          case "MAX_PRICE": {
            if (payload === 0) {
              searchParams.delete("maxPrice");

              return searchParams;
            }

            searchParams.set("maxPrice", payload.toString());

            return searchParams;
          }

          case "MIN_PRICE": {
            if (payload === 0) {
              searchParams.delete("minPrice");

              return searchParams;
            }

            searchParams.set("minPrice", payload.toString());

            return searchParams;
          }

          case "SORT_BY": {
            searchParams.set("sortBy", payload);

            return searchParams;
          }

          default: {
            return searchParams;
          }
        }
      });
    },
    [setSearchParams],
  );

  useEffect(() => {
    getProducts(state).then(setProducts);
  }, [state]);

  const onCategoryChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = target;

      if (checked) {
        return setState({
          type: "CATEGORIES",
          payload: [...(state.categories || []), Number(value)],
        });
      }

      return setState({
        type: "CATEGORIES",
        payload: (state.categories || []).filter(
          (category) => category !== Number(value),
        ),
      });
    },
    [state.categories, setState],
  );

  const onMinPriceChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = target;

      setState({
        type: "MIN_PRICE",
        payload: Number(value),
      });
    },
    [setState],
  );

  const onMaxPriceChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = target;

      setState({
        type: "MAX_PRICE",
        payload: Number(value),
      });
    },
    [setState],
  );

  const onSortByChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = target;

      setState({
        type: "SORT_BY",
        payload: value as SortBy,
      });
    },
    [setState],
  );

  return (
    <section className="container grid gap-4 py-8 md:grid-cols-4">
      <div className="rounded p-4 shadow">
        <div className="grid gap-4 divide-y divide-gray-200">
          <div className="grid gap-4">
            <h3 className="text-xl font-medium uppercase text-gray-800">
              Categories
            </h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
              {categories.map((category) => (
                <div
                  className="flex justify-start gap-2"
                  key={`cat-${category.id}`}
                >
                  <input
                    checked={state.categories?.includes(category.id)}
                    className="cursor-pointer rounded-sm text-primary focus:ring-0"
                    id={`cat-${category.id}`}
                    name="categories[]"
                    onChange={onCategoryChange}
                    type="checkbox"
                    value={category.id}
                  />
                  <label
                    className="cursor-pointer text-gray-600"
                    htmlFor={`cat-${category.id}`}
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 pt-4">
            <h3 className="text-xl font-medium uppercase text-gray-800">
              Price
            </h3>
            <div className="flex items-center">
              <input
                className="w-full rounded border-gray-300 px-3 py-1 text-gray-600 shadow-sm focus:border-primary focus:ring-0"
                min="1"
                name="min"
                onChange={onMinPriceChange}
                placeholder="min"
                type="number"
                value={state.minPrice || ""}
              />
              <span className="mx-3 text-gray-500">-</span>
              <input
                className="w-full rounded border-gray-300 px-3 py-1 text-gray-600 shadow-sm focus:border-primary focus:ring-0"
                min="1"
                name="max"
                onChange={onMaxPriceChange}
                placeholder="max"
                type="number"
                value={state.maxPrice || ""}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:col-span-3">
        <div className="grid grid-cols-2 items-center justify-start gap-4 md:grid-cols-3">
          <select
            className="rounded border-gray-300 px-4 py-3 text-sm text-gray-600 shadow-sm focus:border-primary focus:ring-primary"
            name="sort"
            onChange={onSortByChange}
            value={state.sortBy}
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function getProductsSearchParams(url: string): ProductsSearchParams {
  const { searchParams } = new URL(url);

  const categories = searchParams.get("categories");
  const maxPrice = searchParams.get("maxPrice");
  const minPrice = searchParams.get("minPrice");
  const q = searchParams.get("q");
  const sortBy = searchParams.get("sortBy");

  const productsParams = {
    ...(categories && { categories: categories.split(",").map(Number) }),
    ...(maxPrice && { maxPrice: Number(maxPrice) }),
    ...(minPrice && { minPrice: Number(minPrice) }),
    ...(q && { q }),
    ...(sortBy && { sortBy }),
  };

  return productsParams;
}

export default Products;
