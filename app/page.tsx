import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Manifesto from "../components/Manifesto";
import Flavours from "../components/Flavours";
import AthletesStrip from "../components/AthletesStrip";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-ink text-white">
      <Preloader />
      <Navbar />
      <Hero />
      <Marquee />
      <Manifesto />
      <Flavours />
      <AthletesStrip />
      <Footer />
    </main>
  );
}
