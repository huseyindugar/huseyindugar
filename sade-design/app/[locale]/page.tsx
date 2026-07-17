import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import PhotoStrip from "@/components/PhotoStrip";
import Services from "@/components/Services";
import Process from "@/components/Process";
import TrustStats from "@/components/TrustStats";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <PhotoStrip />
      <Services />
      <Process />
      <TrustStats />
      <Gallery />
      <About />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </>
  );
}
