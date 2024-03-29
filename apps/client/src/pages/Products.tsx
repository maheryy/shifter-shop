import { useCallback, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import ProductCard from "@/components/ProductCard";
import useCategories from "@/hooks/useCategories";
import { useData } from "@/hooks/useData";
import useProducts from "@/hooks/useProducts";
import { Category } from "@/types/category";
import { Loader } from "@/types/loader";
import {
  Direction,
  EOrderBy,
  OrderByMap,
  ProductsSearchParams,
} from "@/types/params";

type Action =
  | { type: "ORDER_BY"; payload: EOrderBy }
  | { type: "MIN_PRICE"; payload: number }
  | { type: "MAX_PRICE"; payload: number }
  | { type: "CATEGORY_ID"; payload: Category["id"][] }
  | { type: "DIRECTION"; payload: Direction };

function reducer(state: ProductsSearchParams, { payload, type }: Action) {
  switch (type) {
    case "CATEGORY_ID": {
      return {
        ...state,
        categoryId: payload,
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

    case "ORDER_BY": {
      return {
        ...state,
        orderBy: payload,
      };
    }

    case "DIRECTION": {
      return {
        ...state,
        direction: payload,
      };
    }

    default: {
      return state;
    }
  }
}

export interface ProductsData {
  searchParams: ProductsSearchParams;
}

export const productsLoader: Loader<ProductsData> = async ({ request }) => {
  const searchParams = getProductsSearchParams(request.url);

  return {
    searchParams,
  };
};

function Products() {
  const [, setSearchParams] = useSearchParams();
  const { searchParams } = useData<ProductsData>();
  const [state, dispatch] = useReducer(reducer, searchParams);
  const debouncedState = useDebounce(state, 500);

  const setState = useCallback(
    (action: Action) => {
      dispatch(action);

      const { payload, type } = action;

      setSearchParams(
        (searchParams) => {
          switch (type) {
            case "CATEGORY_ID": {
              if (payload.length === 0) {
                searchParams.delete("categoryId");

                return searchParams;
              }

              searchParams.set("categoryId", payload.join(","));

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

            case "ORDER_BY": {
              searchParams.set("orderBy", payload);

              return searchParams;
            }

            case "DIRECTION": {
              searchParams.set("direction", payload);

              return searchParams;
            }

            default: {
              return searchParams;
            }
          }
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const onCategoryChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = target;

      if (checked) {
        return setState({
          type: "CATEGORY_ID",
          payload: [...(state.categoryId || []), value],
        });
      }

      return setState({
        type: "CATEGORY_ID",
        payload: (state.categoryId || []).filter(
          (category) => category !== value,
        ),
      });
    },
    [state.categoryId, setState],
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

  const onOrderByChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = target;

      setState({
        type: "ORDER_BY",
        payload: value as EOrderBy,
      });
    },
    [setState],
  );

  const onDirectionChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    if (["ASC", "DESC"].includes(value)) {
      return setState({
        type: "DIRECTION",
        payload: value as Direction,
      });
    }

    return setState({
      type: "DIRECTION",
      payload: "ASC",
    });
  };

  const categoryQuery = useCategories();
  const productQuery = useProducts(debouncedState);

  const isError = categoryQuery.isError || productQuery.isError;

  if (isError) {
    return <div>Something went wrong ...</div>;
  }

  const { data: categoriesData, isLoading: isCategoryLoading } = categoryQuery;
  const { data: productsData, isLoading: isProductLoading } = productQuery;

  return (
    <section className="container grid gap-4 py-8 md:grid-cols-4">
      <div className="rounded p-4 shadow">
        <div className="grid gap-4 divide-y divide-gray-200">
          <div className="grid gap-4">
            <h3 className="text-xl font-medium uppercase text-gray-800">
              Categories
            </h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
              {isCategoryLoading ? (
                <div>Loading...</div>
              ) : (
                categoriesData.map((category) => (
                  <div className="flex justify-start gap-2" key={category.id}>
                    <input
                      checked={state.categoryId?.includes(category.id)}
                      className="cursor-pointer rounded-sm text-primary focus:ring-0"
                      id={category.id}
                      name="categoryId[]"
                      onChange={onCategoryChange}
                      type="checkbox"
                      value={category.id}
                    />
                    <label
                      className="cursor-pointer text-gray-600"
                      htmlFor={category.id}
                    >
                      {category.name}
                    </label>
                  </div>
                ))
              )}
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
            name="order"
            onChange={onOrderByChange}
            value={state.orderBy}
          >
            {Object.keys(OrderByMap).map((key) => {
              return (
                <option key={key} value={key}>
                  {OrderByMap[key as keyof typeof OrderByMap]}
                </option>
              );
            })}
          </select>
          <div className="flex justify-center gap-4">
            <div className="flex gap-2">
              <label className="cursor-pointer" htmlFor="asc">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <input
                checked={state.direction === "ASC"}
                name="direction"
                onChange={onDirectionChange}
                type="radio"
                value="ASC"
              />
            </div>
            <div className="flex gap-2">
              <label className="cursor-pointer" htmlFor="desc">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <input
                checked={state.direction === "DESC"}
                name="direction"
                onChange={onDirectionChange}
                type="radio"
                value="DESC"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {isProductLoading ? (
            <div>Loading...</div>
          ) : (
            productsData.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function getProductsSearchParams(url: string): ProductsSearchParams {
  const { searchParams } = new URL(url);

  const categoryId = searchParams.get("categoryId");
  const maxPrice = searchParams.get("maxPrice");
  const minPrice = searchParams.get("minPrice");
  const q = searchParams.get("q");
  const orderBy = searchParams.get("orderBy");
  const direction = searchParams.get("direction") as Direction;

  const productsParams = {
    ...(categoryId && { categoryId: categoryId.split(",") }),
    ...(maxPrice && { maxPrice: Number(maxPrice) }),
    ...(minPrice && { minPrice: Number(minPrice) }),
    ...(q && { q }),
    ...(orderBy && { orderBy }),
    direction: direction || "ASC",
  };

  return productsParams;
}

export default Products;
