import { getProducts } from "@/api/product.api";
import ProductCard from "@/components/ProductCard";
import { Category } from "@/types/category";
import { ProductListParams, SortType, SortTypeMapping } from "@/types/params";
import { Product } from "@/types/product";
import { useCallback, useEffect, useReducer, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

export interface ProductListData {
  categories: Category[];
  initialParams: ProductListParams;
  initialProducts: Product[];
}

type ParamsAction =
  | { type: "SORT_BY"; payload: SortType }
  | { type: "MIN_PRICE"; payload: number }
  | { type: "MAX_PRICE"; payload: number }
  | { type: "CATEGORIES"; payload: Category["id"][] };

function paramsReducer(
  params: ProductListParams,
  { payload, type }: ParamsAction
) {
  switch (type) {
    case "CATEGORIES": {
      return {
        ...params,
        categories: payload,
      };
    }

    case "MAX_PRICE": {
      return {
        ...params,
        maxPrice: payload,
      };
    }

    case "MIN_PRICE": {
      return {
        ...params,
        minPrice: payload,
      };
    }

    case "SORT_BY": {
      return {
        ...params,
        sortBy: payload,
      };
    }

    default: {
      return params;
    }
  }
}

const ProductList = () => {
  const [, setSearchParams] = useSearchParams();

  const { categories, initialParams, initialProducts } =
    useLoaderData() as ProductListData;

  const [params, dispatch] = useReducer(paramsReducer, initialParams);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  function setParams(action: ParamsAction) {
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
  }

  useEffect(() => {
    getProducts(params).then(setProducts);
  }, [params]);

  const onCategoryChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = target;

      if (checked) {
        return setParams({
          type: "CATEGORIES",
          payload: [...(params.categories || []), Number(value)],
        });
      }

      return setParams({
        type: "CATEGORIES",
        payload: (params.categories || []).filter(
          (category) => category !== Number(value)
        ),
      });
    },
    [params.categories]
  );

  const onMinPriceChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = target;

      setParams({
        type: "MIN_PRICE",
        payload: Number(value),
      });
    },
    []
  );

  const onMaxPriceChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = target;

      setParams({
        type: "MAX_PRICE",
        payload: Number(value),
      });
    },
    []
  );

  const onSortByChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = target;

      setParams({
        type: "SORT_BY",
        payload: value as SortType,
      });
    },
    []
  );

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
                      onChange={onCategoryChange}
                      className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                      checked={params.categories?.includes(category.id)}
                    />
                    <label
                      htmlFor={`cat-${category.id}`}
                      className="text-gray-600 ml-3 cursor-pointer"
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
                  onChange={onMinPriceChange}
                  value={params.minPrice || ""}
                />
                <span className="mx-3 text-gray-500">-</span>
                <input
                  type="number"
                  name="max"
                  min="1"
                  className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                  placeholder="max"
                  onChange={onMaxPriceChange}
                  value={params.maxPrice || ""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="flex items-center mb-4 justify-start">
            <select
              onChange={onSortByChange}
              name="sort"
              value={params.sortBy}
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
