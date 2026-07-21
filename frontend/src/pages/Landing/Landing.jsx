import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import Stats from "../../components/landing/Stats";
import Features from "../../components/landing/Features";
import About from "../../components/landing/About";
import Testimonials from "../../components/landing/Testimonials";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";
import { useTheme } from "../../context/ThemeContext";

const Landing = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <About />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;