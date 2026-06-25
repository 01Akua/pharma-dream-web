import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import ScienceSection from "@/components/ScienceSection";
import ReviewsSection from "@/components/ReviewsSection";
import BlogSection from "@/components/BlogSection";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <ScienceSection />
      <ReviewsSection />
      <BlogSection />
      <Newsletter />
    </main>
  );
}
