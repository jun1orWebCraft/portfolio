import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import CreativeStudio from "./components/CreativeStudio.jsx";
import Research from "./components/Research.jsx";
import Certificates from "./components/Certificates.jsx";
import Leadership from "./components/Leadership.jsx";
import Education from "./components/Education.jsx";
import GitHubActivity from "./components/GitHubActivity.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <Navbar />
      <main>
        <Hero /><About /><Skills /><Projects /><CreativeStudio /><Research /><Certificates /><Leadership /><Education /><GitHubActivity /><Contact />
      </main>
      <Footer />
    </>
  );
}
