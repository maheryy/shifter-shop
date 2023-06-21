import RefundIcon from "@icons/refund.svg";
import SupportIcon from "@icons/support-247.svg";
import VanIcon from "@icons/van.svg";
import { useEffect, useState } from "react";
import { getCategories } from "@/api/category.api";
import { getProducts } from "@/api/product.api";
import Ad from "@/components/home/Ad";
import CategoryCard from "@/components/home/CategoryCard";
import Feature from "@/components/home/Feature";
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/ProductCard";
import { Category } from "@/types/category";
import { Product } from "@/types/product";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
    getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1441035844538-e2ce7dba066b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
        subtitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
        accusantium perspiciatis, sapiente magni eos dolorum ex quos dolores
        odio"
        title="Summer Must-Haves!"
      />
      <section className="container grid gap-4 py-16 md:grid-flow-col">
        <Feature
          icon={<VanIcon />}
          subtitle="Order over 200€"
          title="Free Shipping"
        />
        <Feature
          icon={<RefundIcon />}
          subtitle="30-days money back"
          title="Money back"
        />
        <Feature
          icon={<SupportIcon />}
          subtitle="Customer support"
          title="24/7 Support"
        />
      </section>
      <section className="container py-8">
        <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
          Categories
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard category={category} key={`c-${category.id}`} />
          ))}
        </div>
      </section>
      <section className="container py-8">
        <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
          Top new arrivals
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={`tna-${product.id}`} product={product} />
          ))}
        </div>
      </section>
      <section className="container py-12">
        <Ad
          image="https://images.unsplash.com/photo-1561365452-adb940139ffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2356&q=80"
          subtitle="For new customers only, use the promotional code NEW15"
          title="Online exclusive ! 25% OFF !"
        />
      </section>
      <section className="container py-8">
        <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
          Recommended for you
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {products.slice(4, 12).map((product) => (
            <ProductCard key={`rfy-${product.id}`} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
