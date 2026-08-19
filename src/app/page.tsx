import Hero from "@/components/Hero";
import IngredientsBanner from "@/components/IngredientsBanner";
import HempSection from "@/components/HempSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ScienceSection from "@/components/ScienceSection";
import BlogSection from "@/components/BlogSection";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <IngredientsBanner />
      <HempSection />
      <CategoriesSection />
      <FeaturedProducts />
      <ScienceSection />
      <BlogSection />
      <Newsletter />
    </main>
  );
}
