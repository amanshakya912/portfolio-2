import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Destinations from "@/app/components/Destinations";
import Experience from "@/app/components/Experience";
import Gallery from "@/app/components/Gallery";
import Testimonials from "@/app/components/Testimonials";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import ScrollProgress from "@/app/components/ScrollProgress";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Destinations />
      <Experience />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
