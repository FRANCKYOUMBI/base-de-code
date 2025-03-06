import Hero from "@/app/[lang]/(hydrogen)/home_page/hero_top/Hero";
import FirstSection from "./sections/FirstSection";
import SecondSection from "./sections/SecondSection";

export default function HomePage() {
  return (
    <main className="prose prose-primary pt-[70px]">
      <Hero />
      <FirstSection />
      <SecondSection />
    </main>
  )
}