import Hero from "@/components/Hero";
import IngredientsBanner from "@/components/IngredientsBanner";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ScienceSection from "@/components/ScienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <IngredientsBanner />
      <CategoriesSection />
      <FeaturedProducts />
      <ScienceSection />
      <TestimonialsSection />
      <BlogSection />
      <Newsletter />
    </main>
  );
}
