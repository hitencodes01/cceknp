import AboutUs from "@/components/AboutUs"
import Footer from "@/components/Footer"
import Gallery from "@/components/Gallery"
import HeroSection from "@/components/HeroSection"
import ISOBanner from "@/components/ISOBanner"
import Navbar from "@/components/Navbar"
function App() {
  return (
    <>
      <Navbar />
      <div className='mt-15'>
        <HeroSection />
      </div>
      <ISOBanner />
      <AboutUs />
      <Gallery />
      <Footer />
    </>
  )
}

export default App