import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { getAllProducts } from "../api/product.api";
import { Category } from "../types/category";
import { getAllCategories } from "../api/category.api";
import Feature from "../components/Home/Feature";
import Hero from "../components/Home/Hero";
import CategoryCard from "../components/Home/CategoryCard";
import ProductCard from "../components/ProductCard";
import Ad from "../components/Home/Ad";
import VanIcon from "../assets/icons/van.svg";
import RefundIcon from "../assets/icons/refund.svg";
import SupportIcon from "../assets/icons/support-247.svg";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((products) => setProducts(products))
      .catch((err) => console.log(err));

    getAllCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Hero
        title="Best collection for this summer !"
        subtitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
        accusantium perspiciatis, sapiente magni eos dolorum ex quos dolores
        odio"
        image="https://images.unsplash.com/photo-1441035844538-e2ce7dba066b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
      />

      <section className="container py-16">
        <div className="w-10/12 grid grid-cols-3 gap-6 mx-auto justify-center">
          <Feature
            Icon={VanIcon}
            title="Free Shipping"
            subtitle="Order over 200€"
          />
          <Feature
            Icon={RefundIcon}
            title="Money back"
            subtitle="30-days money back"
          />
          <Feature
            Icon={SupportIcon}
            title="24/7 Support"
            subtitle="Customer support"
          />
        </div>
      </section>

      <section className="container py-8">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Categories
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <CategoryCard key={`c-${category.id}`} category={category} />
          ))}
        </div>
      </section>

      <section className="container py-8">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Top new arrivals
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={`tna-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      <section className="container py-12">
        <Ad
          title="Online exclusive ! 25% OFF !"
          subtitle="For new customers only, use the promotional code NEW15"
          image="https://images.unsplash.com/photo-1561365452-adb940139ffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2356&q=80"
        />
      </section>

      <section className="container py-8">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Recommended for you
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {products.slice(4, 12).map((product) => (
            <ProductCard key={`rfy-${product.id}`} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
