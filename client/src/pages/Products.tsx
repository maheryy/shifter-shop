import { useCallback, useEffect, useReducer, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { getProducts } from "@/api/product.api";
import ProductCard from "@/components/ProductCard";
import { Category } from "@/types/category";
import { ProductsParams, SortType, SortTypeMapping } from "@/types/params";
import { Product } from "@/types/product";

export interface ProductsData {
  categories: Category[];
  initialParams: ProductsParams;
  initialProducts: Product[];
}

type ParamsAction =
  | { type: "SORT_BY"; payload: SortType }
  | { type: "MIN_PRICE"; payload: number }
  | { type: "MAX_PRICE"; payload: number }
  | { type: "CATEGORIES"; payload: Category["id"][] };

function paramsReducer(
  params: ProductsParams,
  { payload, type }: ParamsAction,
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

function Products() {
  const [, setSearchParams] = useSearchParams();

  const { categories, initialParams, initialProducts } =
    useLoaderData() as ProductsData;

  const [params, dispatch] = useReducer(paramsReducer, initialParams);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const setParams = useCallback(
    (action: ParamsAction) => {
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
          (category) => category !== Number(value),
        ),
      });
    },
    [params.categories, setParams],
  );

  const onMinPriceChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = target;

      setParams({
        type: "MIN_PRICE",
        payload: Number(value),
      });
    },
    [setParams],
  );

  const onMaxPriceChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = target;

      setParams({
        type: "MAX_PRICE",
        payload: Number(value),
      });
    },
    [setParams],
  );

  const onSortByChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = target;

      setParams({
        type: "SORT_BY",
        payload: value as SortType,
      });
    },
    [setParams],
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
                    checked={params.categories?.includes(category.id)}
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
                value={params.minPrice || ""}
              />
              <span className="mx-3 text-gray-500">-</span>
              <input
                className="w-full rounded border-gray-300 px-3 py-1 text-gray-600 shadow-sm focus:border-primary focus:ring-0"
                min="1"
                name="max"
                onChange={onMaxPriceChange}
                placeholder="max"
                type="number"
                value={params.maxPrice || ""}
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
            value={params.sortBy}
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

export default Products;
